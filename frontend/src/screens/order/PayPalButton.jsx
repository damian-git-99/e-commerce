/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';
import { PayPalButton as Button } from 'react-paypal-button-v2';

export const PayPalButton = ({ amount, onSuccess }) => {
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data: clientId } = await axios.get('http://localhost:5000/api/config/paypal', config);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();
  }, []);

  return (
    <>
      { sdkReady === false ? <Loader /> : null }
      <Button
        amount={amount}
        onSuccess={(paymentResult) => onSuccess(paymentResult)}
      />
    </>
  );
};

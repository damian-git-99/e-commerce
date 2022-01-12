package com.backend.spring.modules.paypal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaypalController {

    @GetMapping("api/config/paypal")
    public String getId(){
        return "AaIycBSJf3sZfI5cjlHUqFjtOODTBOqReeCD3aPBDSeBjSPVDdkESEfSwOp4mvDaRAS7NoCJMp4JsWSu";
    }

}

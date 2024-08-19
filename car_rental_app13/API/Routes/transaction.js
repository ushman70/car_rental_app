const express = require('express');
const router = express.Router();
const User = require('../Model/users')
const { body, validationResult } = require('express-validator')
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
var utils = require('C://react-apps/car_rental_app13/node_modules/authorizenet/lib/utils.js')
var constants = require('C://react-apps/car_rental_app13/node_modules/authorizenet/lib/constants.js');
const { param } = require('./car_display');


router.post('/', (req,res) => {
     const {
     name,
     email,
     car_name,
     price,
     credit_card,
     exp,
     CVV,
     DCI,
     DCO,
     CIT,
     COT
     } = req.body.params
    
     let replaced = exp.replace('/', '')
     let validator;
     
   
    
    
     function callback(param) {
       return console.log(param)
     }
      
     function chargeCreditCard(callback) {
        
        let string_price = price.toString();
        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName('9d2wLZe95M');
        merchantAuthenticationType.setTransactionKey('4N659FnS32scN83q');
    
        var creditCard = new ApiContracts.CreditCardType();
        creditCard.setCardNumber('370000000000002');
        creditCard.setExpirationDate(replaced);
        creditCard.setCardCode(CVV);
    
        var paymentType = new ApiContracts.PaymentType();
        paymentType.setCreditCard(creditCard);
    
        var orderDetails = new ApiContracts.OrderType();
        orderDetails.setInvoiceNumber('INV-12345');
        orderDetails.setDescription('Car rental production');
    
        var tax = new ApiContracts.ExtendedAmountType();
        tax.setAmount('4.26');
        tax.setName(name);
        tax.setDescription('level2 tax');
    
        var duty = new ApiContracts.ExtendedAmountType();
        duty.setAmount(string_price);
        duty.setName(name);
        duty.setDescription('duty description');
    
        var shipping = new ApiContracts.ExtendedAmountType();
        shipping.setAmount('8.55');
        shipping.setName('shipping name');
        shipping.setDescription('shipping description');
    
        var billTo = new ApiContracts.CustomerAddressType();
        billTo.setFirstName(name);
        billTo.setLastName('Johnson');
        billTo.setCompany('Souveniropolis');
        billTo.setAddress('14 Main Street');
        billTo.setCity('Pecan Springs');
        billTo.setState('TX');
        billTo.setZip('44628');
        billTo.setCountry('USA');
    
        var shipTo = new ApiContracts.CustomerAddressType();
        shipTo.setFirstName('China');
        shipTo.setLastName('Bayles');
        shipTo.setCompany('Thyme for Tea');
        shipTo.setAddress('12 Main Street');
        shipTo.setCity('Pecan Springs');
        shipTo.setState('TX');
        shipTo.setZip('44628');
        shipTo.setCountry('USA');
    
       // line items were here
       //userfield was next
    
        var transactionSetting1 = new ApiContracts.SettingType();
        transactionSetting1.setSettingName('duplicateWindow');
        transactionSetting1.setSettingValue('120');
    
        var transactionSetting2 = new ApiContracts.SettingType();
        transactionSetting2.setSettingName('recurringBilling');
        transactionSetting2.setSettingValue('false');
    
        var transactionSettingList = [];
        transactionSettingList.push(transactionSetting1);
        transactionSettingList.push(transactionSetting2);
    
        var transactionSettings = new ApiContracts.ArrayOfSetting();
        transactionSettings.setSetting(transactionSettingList);
    
        var transactionRequestType = new ApiContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(string_price);
        //Line items and userfields here
        transactionRequestType.setOrder(orderDetails);
        transactionRequestType.setTax(tax);
        transactionRequestType.setDuty(duty);
        transactionRequestType.setShipping(shipping);
        transactionRequestType.setBillTo(billTo);
        transactionRequestType.setShipTo(shipTo);
        transactionRequestType.setTransactionSettings(transactionSettings);
    
        var createRequest = new ApiContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);
    
        //pretty print request
        console.log(JSON.stringify(createRequest.getJSON(), null, 2));
        var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());    
        
        //Defaults to sandbox
        //ctrl.setEnvironment(SDKConstants.endpoint.production);
        
        ctrl.execute(function(){
    
            var apiResponse = ctrl.getResponse();
            var response = new ApiContracts.CreateTransactionResponse(apiResponse);
    
            //pretty print response
            console.log(JSON.stringify(response, null, 2));
    
            if(response != null){
                
                if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
                    if(response.getTransactionResponse().getMessages() != null){
                        console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
                        console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
                        console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
                        console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
                        res.sendStatus(200)
                        
                    }
                    else {
                        console.log('Failed Transaction.');
                        if(response.getTransactionResponse().getErrors() != null){
                            console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                            console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                        }
                    }
                }
                else {
                    console.log('Failed Transaction. ');
                    if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
                    
                        console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                        console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    }
                    else {
                        console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                        console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                    }
                }
            }
            else {
                console.log('Null Response.');
            }
    
            callback(response);
        });
         
       
    }
    
   
    chargeCreditCard(callback)
     
   


})

module.exports = router;
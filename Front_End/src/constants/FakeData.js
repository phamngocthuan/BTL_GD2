const Product = [
    {ProductId : "QLNS", ProductCode : "QLNS", ProductName : "QLNS"},
    {ProductId : "HTNS", ProductCode : "HTNS", ProductName : "HTNS"},
    {ProductId : "HTSN", ProductCode : "HTSN", ProductName : "HTSN"},
]


const PackageProduct = [
    {ProductCode : "QLNS", PackageProductName :
        [
            { ProductCode : "ABC", ProductName : "ABC"},
            { ProductCode : "A12BC", ProductName : "A12BC"},
            { ProductCode : "A123BC", ProductName : "A123BC"},

        ] 
    }   ,
    {ProductCode : "HTNS", PackageProductName :
     [{ ProductCode : "ABC12121212", ProductName : "AB212121212C"}] }   ,
    {ProductCode : "HTSN", PackageProductName :
     [] }   ,
  ]


const Contract = [
    {   status : '0', 
        name : "UNSENT",
         data : [  {
                        key : '1',
                        id : '1',
                        codeRequired : 'ABC!dfadsfaDDF',
                        codeSale : 'MSAIVD',
                        nameSale : 'Dự án bán lẻ',
                        numberContract : '123123qqerqewrqBAC',
                        contactSigningDate : '11/11/1111',
                        orderNumber : 123,
                        cayRequest : '12/12/1212',
                        productCode : 'QLNS',
                    
                    },
                    {
                        key : '2',
                        id : '2',
                        codeRequired : 'ADdfadsfasFADSDFF',
                        codeSale : 'MSAIVD212',
                        nameSale : 'Dự án bán lẻ ABC',
                        numberContract : '12312dfsd3BAC',
                        contactSigningDate : '11/11/1111',
                        orderNumber : 123,
                        dayRequest : '12/12/1212',
                        productCode : 'QLNS',
                    
                    }],

    }
    ,
    {   status : '1', 
        name : "PENDING",
         data : [  {
                        key : '1',
                        id : '1',
                        CodeRequired : 'ABCasdfasdf!DDF',
                        CodeSale : 'MSAIVD',
                        NameSale : 'Dự án bán lẻ',
                        NumberContract : '123123qqerqewrqBAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '2',
                        id : '2',
                        CodeRequired : 'ADFasdfasdfADSDFF',
                        CodeSale : 'MSAIVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTNS',
                    
                    },
                    {
                        key : '3',
                        id : '3',
                        CodeRequired : 'ADadfaasdfasdfdsfFADSDFF',
                        CodeSale : 'MSAIdfsdfasdVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '4',
                        id : '4',
                        CodeRequired : 'AD1212tuityui1212FADSDFF',
                        CodeSale : 'MSAIasdfasdfVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
        }]
    }
    ,
    {   status : '2', 
        name : "REFUSE",
         data : [  {
                        key : '1',
                        id : '1',
                        CodeRequired : 'ABCltuituity!DDF',
                        CodeSale : 'MSAIVD',
                        NameSale : 'Dự án bán lẻ',
                        NumberContract : '123123qqerqewrqBAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTNS',
                    
                    },
                    {
                        key : '2',
                        id : '2',
                        CodeRequired : 'ADFADStyuityuiDFF',
                        CodeSale : 'MSAIVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '3',
                        id : '3',
                        CodeRequired : 'ADadtuituifadsfFADSDFF',
                        CodeSale : 'MSAIdfsdfasdVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '4',
                        id : '4',
                        CodeRequired : 'AD12121tuityuit212FADSDFF',
                        CodeSale : 'MSAIasdfasdfVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
        }]
    }
    ,
    {   status : '3', 
        name : "APPROVED",
         data : [  {
                        key : '1',
                        id : '1',
                        CodeRequired : 'ABtuityuitC!DDF',
                        CodeSale : 'MSAIVD',
                        NameSale : 'Dự án bán lẻ',
                        NumberContract : '123123qqerqewrqBAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '2',
                        id : '2',
                        CodeRequired : 'ADFADtuityuSDFF',
                        CodeSale : 'MSAIVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '3',
                        id : '3',
                        CodeRequired : 'ADadtuityufadsfFADSDFF',
                        CodeSale : 'MSAIdfsdfasdVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
                    },
                    {
                        key : '4',
                        id : '4',
                        CodeRequired : 'AD121tuityui21212FADSDFF',
                        CodeSale : 'MSAIasdfasdfVD212',
                        NameSale : 'Dự án bán lẻ ABC',
                        NumberContract : '12312dfsd3BAC',
                        ContactSigningDate : '11/11/1111',
                        OrderNumber : 123,
                        DayRequest : '12/12/1212',
                        ProductCode : 'HTSN',
                    
        }]
    }
]


export { Contract, PackageProduct, Product}
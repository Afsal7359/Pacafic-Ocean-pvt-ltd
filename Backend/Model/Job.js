const mongoose = require('mongoose')

const Jobschema = new mongoose.Schema({
    BookingSource: {
        type: String,
    },
    Carrier:{
        type:String
    } ,
    CarrierBookRef:{
        type:String
    } ,
    CarrierDoc:{
        type:String
    },
    CarrierDocDate:{
        type:String
    },
    CarrierDocs:{
        type:String,
    },
    ChargeWeight:{
        type:String
    },
    Commodity:{
        type:String
    },
    Vessel:{
        type:String
    },
    Container20ft:{
        type:String
    },
    Container40ft:{
        type:String
    },
    CostData:{
        type:[{
            CostBuyingRate:{
                type:String
            },
            CostCurrency:{
                type:String
            },
            CostExRate:{
                type:String
            },
            CostFcGrossAmt:{
                type:String
            },
            CostLcAmount:{
                type:String
            },
            CostRemark:{
                type:String
            },
            Costparty:{
                type:String
            },
            CostpartyType:{
                type:String
            },
            Costrate:{
                type:String
            },
            NetLc:{
                type:String
            },
            tax:{
                type:String
            },
            code:{
                type:String
            },
            description:{
                type:String
            },
            quantity:{
                type:String
            },
            tariffTerm:{
                type:String
            },
            uom:{
                type:String
            },
            uomType:{
                type:String
            }
        }]
    },
        Customer:{
            type:String
        },
        CustomerOU:{
            type:String
        },
        CustomerRef:{
            type:String
        },
        CustomerServicePerson:{
            type:String
        },
        CustomsDoc:{
            type:String
        },
        DangerousGoods:{
            type:String
        },
        Date:{
            type:String
        },
        DeliveryAgent:{
            type:String
        },
        DeliveryTerm:{
            type:String
        },
        Destination:{
            type:String
        },
        DischPort:{
            type:String
        },
        DocType:{
            type:String
        },
        FreightTerms:{
            type:String
        },
        HouseDoc:{
            type:String
        },
        HouseDocDate:{
            type:String
        },
        HsCode:{
            type:String
        },
        LoadPort:{
            type:String
        },
        LoadType:{
            type:String
        },
        NominationAgent:{
            type:String
        },
        NominationOU:{
            type:String
        },
        NumberOfPkgs:{
            type:String
        },
        OfficeLocation:{
            type:String
        },
        Origin:{
            type:String
        },
        OriginAgent:{
            type:String
        },
        PackageType:{
            type:String
        },
        PickupTerm:{
            type:String
        },
        RevenueData:{
            type:[{
                NetLc:{
                    type:String
                },
                tax:{
                    type:String
                },
                RevenueCurrency:{
                    type:String
                },
                RevenueExRate:{
                    type:String
                },
                RevenueLcAmount:{
                    type:String
                },
                RevenueRemark:{
                    type:String
                },
                RevenuFcGrossAmt:{
                    type:String
                },
                Revenuparty:{
                    type:String
                },
                RevenupartyType:{
                    type:String
                },
                Revenurate:{
                    type:String
                },
                code:{
                    type:String
                },
                description:{
                    type:String
                },
                quantity:{
                    type:String
                },
                tariffTerm:{
                    type:String
                },
                uom:{
                    type:String
                },
                uomType:{
                    type:String
                }
            }]
        },
        SalesPerson:{
            type:String
        },
        SeaShipmentType:{
            type:String
        },
        Service:{
            type:String
        },
        TSLocallyDelivered:{
            type:String
        },
        Volume:{
            type:String
        },
        Voyage:{
            type:String
        },
        Weight:{
            type:String
        },
        consigneeAddress:{
        type:String
        },
        consigneeName:{
            type:String
        },
        eta:{
            type:String
        },
        etd:{
            type:String
        },
        notifyAddress:{
            type:String
        },
        notifyName:{
            type:String
        },
        shipperAddress:{
            type:String
        },
        shipperName:{
            type:String
        },
        tos:{
            type:String
        },
        IgmDate:{
            type:String
        },
        IgmNumber:{
            type:String
        },
        MarkandNumber:{
            type:String
        },
        cargoDescription:{
            type:String
        },
        ContainerData:{
            type:[{
                agentSeal:{
                    type:String
                },
                cargoWeight:{
                    type:String
                },
                containerNo:{
                    type:String
                },
                containerType:{
                    type:String
                },
                customSeal:{
                    type:String
                },
                netWeight:{
                    type:String
                },
                numberOfUnits:{
                    type:String
                },
                packageType:{
                    type:String
                },
                tareWeight:{
                    type:String
                },
                volumeCo:{
                    type:String
                },
            }]
        },
      

})
const Job = mongoose.model('Job',Jobschema);
module.exports = Job;
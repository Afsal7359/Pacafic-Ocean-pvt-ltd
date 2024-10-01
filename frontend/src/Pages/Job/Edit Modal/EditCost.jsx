import React, { useEffect, useState } from 'react'
import { GetAllCurrency } from '../../../ApiCalls/Currency';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const EditCost = ({setModal,setCostData,setRevenueData,CostData,RevenueData,item,index}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showRevenue, setShowRevenue] = useState(true);
    const [showCost, setShowCost] = useState(false);
    const [Quantity, setQuantity] = useState();
    const [revenueRate, setRevenueRate] = useState();
    const [Currency, setCurrency] = useState([]);
    const [excRate, setExcRate] = useState();
    const [lcAmount, setLcAmount] = useState(0);
    const [revenueRateco, setRevenueRateCo] = useState(0);
    const [CostRateco, setCostRateCo] = useState();
    const [Currencyco, setCurrencyco] = useState([]);
    const [excRateco, setExcRateco] = useState();
    const [lcAmountco, setLcAmountco] = useState(0);
    const [netLcAmount, setNetLcAmount] = useState();
    const [fcAmountRevenu, setFCAmountRevenu] = useState();
    const [fcAmountCost, setFCAmountCost] = useState();
    const [netLc, setNetLc] = useState(0);
  
    // Prepopulate form fields when editing data
    useEffect(() => {
      if (item) {
        setValue("CostBuyingRate", item.CostBuyingRate);
        setValue("CostpartyType", item.CostpartyType);
        setValue("tax", item.tax);
        setValue("Costparty", item.Costparty);
        setValue("Costrate",item.Costrate);
        setValue("CostFcGrossAmt", item.CostFcGrossAmt);
        setValue("CostExRate", item.CostExRate);
        setValue("CostCurrency", item.CostCurrency);
        setValue("CostLcAmount",item.CostLcAmount)
        setValue("CostRemark",item.CostRemark)
        // Add other fields as needed
        setRevenueRate(item.Costrate);
        setExcRateco(item.CostExRate)
      }
  
      if (item) {
        setValue("code", item.code);
        setValue("description", item.description);
        setValue("uomType", item.uomType);
        setValue("uom", item.uom);
        setValue("quantity", item.quantity);
        setValue("tariffTerm", item.tariffTerm);
        setQuantity(item.quantity)
        // Add other fields as needed
      }
    }, [CostData, item, setValue]);
  
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      if (name === 'revenue') {
        setShowRevenue(checked);
      } else if (name === 'cost') {
        setShowCost(checked);
      }
    };
  
    const handleCurrencyFetch = async () => {
      try {
        const response = await GetAllCurrency();
        if (response.success) {
          setCurrency(response.data);
        } else {
          toast.error(`${response.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      handleCurrencyFetch();
    }, []);
  
    const RevenueCurrencyChange = () => {
      try {
        const lcamounts = (Quantity * revenueRate) * excRate;
        if (lcamounts) {
            setValue("CostLcAmount", lcamounts);
        }
        setLcAmount(lcamounts);
      } catch (error) {
        console.log(error);
      }
    };
  
    const RevenueCurrencyChangeco = () => {
      try {
        console.log("tyytytytytytyt");
        console.log(Quantity,"qqqqqq");
        console.log(revenueRate,"qqqq");
        console.log(excRate,"dddddd");
        var lcamounts = (Quantity * revenueRate) * excRateco;
        setValue("CostLcAmount", lcamounts);
        setLcAmountco(lcamounts);
      } catch (error) {
        console.log(error);
      }
    };
  
    const FcAmountREvenuCal = () => {
      try {
        var fc = revenueRate * Quantity;
        setFCAmountRevenu(fc);
        setValue("RevenuFcGrossAmt", fc);
      } catch (error) {
        console.log(error);
      }
    };
  
    const FcAmountCostCal = () => {
      try {
        var FcC = revenueRate * Quantity;
        setFCAmountCost(FcC);
        setValue("CostFcGrossAmt", FcC);
      } catch (error) {
        console.log(error);
      }
    };
  
    const NetLcCal = () => {
      try {
        const lcAmountParsed = isNaN(parseFloat(lcAmount)) ? 0 : parseFloat(lcAmount);
        const lcAmountCoParsed = isNaN(parseFloat(lcAmountco)) ? 0 : parseFloat(lcAmountco);
        var NetLc = lcAmountParsed - lcAmountCoParsed;
        setNetLc(NetLc);
          setValue("NetLc", NetLc);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      NetLcCal();
    }, [lcAmount, lcAmountco]);
  
    const CurrencyChangeco = (e) => {
      const selectedValue = JSON.parse(e.target.value);
      setExcRateco(selectedValue.exchangeRate);
      setValue("CostExRate", selectedValue.exchangeRate);
      setValue("CostCurrency", selectedValue.name);
    };
  
    useEffect(() => {
      FcAmountREvenuCal();
      FcAmountCostCal();
      RevenueCurrencyChangeco();
      RevenueCurrencyChange();
    }, [excRate, revenueRate, excRateco, revenueRateco, Quantity]);
  
    const onSubmit = (data) => {
        const UpdateCostData = CostData.map((item, Uindex) => {
            if (Uindex === index) {
              return {
                ...item,
                 code: data.code,
                description: data.description,
                uomType: data.uomType,
                uom: data.uom,
                quantity: data.quantity,
                tariffTerm: data.tariffTerm,
                CostBuyingRate: data.CostBuyingRate,
                CostpartyType: data.CostpartyType,
                tax: data.tax,
                Costparty: data.Costparty,
                Costrate :data.Costrate,
                CostFcGrossAmt: data.CostFcGrossAmt,
                CostExRate: data.CostExRate,
                CostCurrency: data.CostCurrency,
                CostLcAmount:data.CostLcAmount,
                CostRemark:data.CostRemark,
            };
        }
        return item;
      });
      setCostData(UpdateCostData);
      setModal(false);
    };
  return (
<>
<div className="modal" tabIndex="10" role="dialog" style={{ display: 'block', backdropFilter: 'blur(10px)'  }}>
<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px' }}>
        <div className="modal-content" >
            <div className="modal-header">
              <button className="btn close submit-form" data-bs-dismiss="modal" onClick={()=>setModal(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                  
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4> Cost Details</h4>
                        </div>
                      </div>
                 
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Type code</label>
                          <input
                            type="text"
                            className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                            {...register("code", { required: true })}
                          />
                          {errors.code && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Type Description</label>
                          <input
                            type="text"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            {...register("description", { required: true })}
                          />
                          {errors.description && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>UOM Type</label>
                          <select
                            className={`form-control ${errors.uomType ? 'is-invalid' : ''}`}
                            {...register("uomType", { required: true })}
                          >
                            <option value="">select</option>
                            <option value="20 Ft">20 Ft</option>
                            <option value="40 Ft">40 Ft</option>
                            <option value="Weight">Weight</option>
                            <option value="Volume">Volume</option>
                            <option value="Shipment">Shipment</option>
                            <option value="Document">Document</option>
                          </select>
                          {errors.uomType && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>UOM</label>
                          <select
                            className={`form-control ${errors.uom ? 'is-invalid' : ''}`}
                            {...register("uom", { required: true })}
                          >
                            <option value="">select</option>
                            <option value="20 Ft">20 Ft</option>
                            <option value="40 Ft">40 Ft</option>
                            <option value="Kgs">Kgs</option>
                            <option value="CBM">CBM</option>
                            <option value="Shipment">Shipment</option>
                            <option value="Document">Document</option>
                          </select>
                          {errors.uom && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>
                    

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Quantity</label>
                          <input
                            type="number"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            {...register("quantity", { required: true, min: 0 })}
                            onChange={(e)=>setQuantity(e.target.value)}
                          />
                          {errors.quantity && <span className="invalid-feedback">This field is required and must be greater than 0</span>}
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Tariff Term</label>
                          <select
                            className={`form-control ${errors.tariffTerm ? 'is-invalid' : ''}`}
                            {...register("tariffTerm", { required: true })}
                          >
                            <option value="">select</option>
                            <option value="Prepaid">Prepaid</option>
                            <option value="Collect">Collect</option>
                          </select>
                          {errors.tariffTerm && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>
                      
                    </div>
                
                  </div>
                </div>
              </div>
            </div>
           
   

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-heading">
                        <h4>Cost Details</h4>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Buying Rate</label>
                        <input {...register("CostBuyingRate")} type="number" className={`form-control `}/>
                   
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Party Type</label>
                        <select  className={`form-control ${errors.CostpartyType ? 'is-invalid' : ''}`}
                          {...register("CostpartyType", { required: true })}>
                          <option value="">select</option>
                          <option value="shipper">Shipper</option>
                          <option value="Trader">Trader</option>
                          <option value="EMKL">EMKL</option>
                          <option value="Others">Others</option>
                        </select>
                        {errors.CostpartyType && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Tax</label>
                          <select
                            className={`form-control ${errors.tax ? 'is-invalid' : ''}`}
                            {...register("tax", { required: true })}
                          >
                            <option value="">select</option>
                            <option value="0">0 %</option>
                            <option value="1.1">1.1 %</option>
                            <option value="11">11 %</option>
                          </select>
                          {errors.tax && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Party</label>
                       <input type="text"    {...register("Costparty", { required: true })}
                       className={`form-control ${errors.Costparty ? 'is-invalid' : ''}`}  />
                        {errors.Costparty && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Rate</label>
                        <input type="number"
                         {...register("Costrate", { required: true })}
                        value={revenueRate} onChange={(e)=>setRevenueRate(e.target.value)}
                        className={`form-control ${errors.Costrate ? 'is-invalid' : ''}`} min={0} />
                        {errors.Costrate && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Gross FC Amt</label>
                        <input type="text"  {...register("CostFcGrossAmt", )}
                         value={fcAmountCost} className={`form-control `} readOnly/>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Currency</label>
                        <select   className={`form-control `}
                         onChange={CurrencyChangeco} >
                        <option value={item.CostCurrency}>{item.CostCurrency}</option>
                         {Currency.map((item,index)=>(
                          <option key={item._id} value={JSON.stringify({ name: item.name, exchangeRate: item.exchangeRate })}>{item.name}</option>
                         ))}
                        </select>
                        
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Ex.Rate</label>
                        <input type="text" {...register("CostExRate",{required:true})} value={excRateco} className={`form-control `} onChange={(e)=>{setExcRateco(e.target.value)}}/>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>LC Amount</label>
                        <input {...register("CostLcAmount", { required: true })}
                        type='text' className={`form-control ${errors.CostLcAmount ?'is-invalid' : ''}`} 
                          readOnly />
                          {errors.CostLcAmount && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Remark</label>
                        <input {...register("CostRemark")} 
                        type="text" className={`form-control ${errors.CostRemark ? 'is-invalid':""} `} />
                      </div>
                    </div>
                  
                  </div>
              </div>
            </div>
          </div>
        </div>
                  <div class="row justify-content-center"  >
                          <div class="col-12 col-md-6 col-xl-3 " style={{backgroundColor:"#43DDC1"}} >
                            <div class="doctor-submit text-left pt-3">
                             <p style={{fontWeight:"900"}}>Net Lc : {netLc}</p>
                            </div>
                          </div>
                        </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                       <div className="card-body">
                         <div class="row justify-content-end">
                          <div class="col-12 col-md-6 col-xl-3 pb-4" >
                            <div class="doctor-submit text-end">
                              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary submit-form me-2">
                                submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
                   </form>
                </div>	
              </div>
          </div>
    </div>
</>
   

  )
}

export default EditCost
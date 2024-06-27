import React, { useEffect, useState } from 'react'
import { GetAllCurrency } from '../../../ApiCalls/Currency';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const AddRevenueModal = ({setModal,setCostData,setRevenueData,CostData,RevenueData}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showRevenue, setShowRevenue] = useState(true);
    const [showCost, setShowCost] = useState(false);
    const [Quantity,setQuantity]=useState();
    const [revenueRate,setRevenueRate]=useState();
    const [Currency,setCurrency]=useState([])
    const [excRate,setExcRate]=useState()
    const [lcAmount,setLcAmount]=useState(0)
    const [revenueRateco,setRevenueRateCo]=useState();
    const [Currencyco,setCurrencyco]=useState([])
    const [excRateco,setExcRateco]=useState()
    const [lcAmountco,setLcAmountco]=useState(0)
    const [netLcAmount,setNetLcAmount]=useState();
    const [fcAmountRevenu,setFCAmountRevenu]=useState()
    const [fcAmountCost,setFCAmountCost]=useState()
    const [netLc,setNetLc]=useState(0)

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'revenue') {
          setShowRevenue(checked);
        } else if (name === 'cost') {
          setShowCost(checked);
        }
      };
      const handleCurrencyFetch = async()=>{
        try {
          const response = await GetAllCurrency();
          if(response.success){
            setCurrency(response.data)
          }else{
            toast.error(`${response.message}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        handleCurrencyFetch();
      },[])
      const RevenueCurrencyChange =()=>{
        try {
          const lcamounts = (Quantity * revenueRate) * excRate;
          if(lcamounts){
            setValue("RevenueLcAmount", lcamounts)
          }
          setLcAmount(lcamounts)
        } catch (error) {
          console.log(error);
        }
      }
      const RevenueCurrencyChangeco =()=>{
        try {
          var lcamounts = (Quantity * revenueRateco) * excRateco;
        if(lcAmountco){
          setValue("CostLcAmount", lcamounts)
        }
          setLcAmountco(lcamounts)
        } catch (error) {
          console.log(error);
        }
      }
      const FcAmountREvenuCal =()=>{
        try {
          var fc = revenueRate*Quantity
          setFCAmountRevenu(fc)
          if(fcAmountRevenu ===!NaN){
            setValue("RevenuFcGrossAmt", fc)
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      const FcAmountCostCal=()=>{
        try {
          var FcC = revenueRateco * Quantity
          setFCAmountCost(FcC)
          if(fcAmountRevenu){
            setValue("CostFcGrossAmt", FcC)
          }
        } catch (error) {
          console.log(error);
        }
      }
      const NetLcCal =()=>{
        try {
          
          const lcAmountParsed = isNaN(parseFloat(lcAmount)) ? 0 : parseFloat(lcAmount);
          const lcAmountCoParsed = isNaN(parseFloat(lcAmountco)) ? 0 : parseFloat(lcAmountco);
          console.log(lcAmountParsed,"Lcccc",lcAmountCoParsed,"lcCCCCCco");
          var NetLc = lcAmountParsed - lcAmountCoParsed;

          console.log(NetLc,"netLllc");
          setNetLc(NetLc)
          if(netLc){
            setValue("NetLc", NetLc)
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        NetLcCal();
      },[lcAmount,lcAmountco])
      
      const CurrencyChange = (e) => {
        const selectedValue = JSON.parse(e.target.value);
        setExcRate(selectedValue.exchangeRate);
        setValue("RevenueExRate", selectedValue.exchangeRate);
        setValue("RevenueCurrency", selectedValue.name);
      };
      const CurrencyChangeco = (e) => {
        const selectedValue = JSON.parse(e.target.value);
        setExcRateco(selectedValue.exchangeRate);
        setValue("CostExRate", selectedValue.exchangeRate);
        setValue("CostCurrency", selectedValue.name);
      };
      useEffect(()=>{
        FcAmountREvenuCal();
        FcAmountCostCal();
        RevenueCurrencyChangeco();
        RevenueCurrencyChange();
          
      },[excRate,revenueRate,excRateco,revenueRateco,Quantity])

      const onSubmit = (data) => {
        console.log(data);
        
        // Sanitize the form data
        const sanitizedData = {};
        for (const key in data) {
          if (data[key] !== "" && data[key] !== null) {
            sanitizedData[key] = data[key];
          }
        }
        console.log(sanitizedData, "saaaaaaaaaaaaaaaaaaa");
      
        // Separate items based on their prefixes
        const costItems = {};
        const revenueItems = {};
        const otherItems = {};
      
        for (const key in sanitizedData) {
          if (key.startsWith("Cost")) {
            costItems[key] = sanitizedData[key];
          } else if (key.startsWith("Reven")) {
            revenueItems[key] = sanitizedData[key];
          } else {
            otherItems[key] = sanitizedData[key];
          }
        }
 
        const CostArr = {...otherItems,...costItems}
        const RevenueArr = {...otherItems,...revenueItems}
      
        if(costItems.Costparty){
           CostData.push(CostArr)
        }
         if(revenueItems.Revenuparty){
          RevenueData.push(RevenueArr)
        }
     
     setModal(false)
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
                          <h4>Revenue  & Cost Details</h4>
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
           
            <div className="row mb-3 px-5">
              <div className="col-12">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    id="revenueCheckbox"
                    name="revenue"
                    className="form-check-input"
                    checked={showRevenue}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="revenueCheckbox">
                    Revenue Details
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    id="costCheckbox"
                    name="cost"
                    className="form-check-input"
                    checked={showCost}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="costCheckbox">
                    Cost Details
                  </label>
                </div>
              </div>
            </div>

      {showRevenue && (
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-heading">
                        <h4>Revenue Details</h4>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Party Type</label>
                        <select  className={`form-control ${errors.RevenupartyType ? 'is-invalid' : ''}`}
                          {...register("RevenupartyType", { required: true })}>
                          <option value="">select</option>
                          <option value="Transporter">Transporter</option>
                          <option value="Vender">Vender</option>
                          <option value="Customer">Customer</option>
                          <option value="Airline">Airline</option>
                          <option value="CHA">CHA</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.RevenupartyType && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Party</label>
                     <input type="text" className={`form-control ${errors.Revenuparty ? 'is-invalid':""} `}
                     {...register("Revenuparty",{required:true})} />
                        {errors.Revenuparty && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Rate</label>
                        <input type="number"
                         {...register("Revenurate", { required: true })}
                        value={revenueRate} onChange={(e)=>setRevenueRate(e.target.value)}
                        className={`form-control ${errors.Revenurate ? 'is-invalid' : ''}`} min={0} />
                        {errors.Revenurate && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Gross FC Amt</label>
                        <input type="text"   
                        {...register("RevenuFcGrossAmt")}
                         value={fcAmountRevenu}
                          className={`form-control ${errors.RevenuFcGrossAmt ? 'is-invalid' : ''}`}   readOnly />
                         {errors.RevenuFcGrossAmt && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Currency</label>
                        <select   className={`form-control `}
                         onChange={CurrencyChange} >
                          <option value="">select</option>
                         {Currency.map((item,index)=>(
                          <option key={item._id} value={JSON.stringify({ name: item.name, exchangeRate: item.exchangeRate })}>{item.name}</option>
                         ))}
                        </select>
                        
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Ex.Rate</label>
                        <input 
                         type="text"  {...register("RevenueExRate")} 
                          value={excRate}
                          className={`form-control ${errors.RevenueExRate ? 'is-invalid':""} `}
                          onChange={(e)=>setExcRate(e.target.value)}/>
                           {errors.RevenueExRate && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>LC Amount</label>
                        <input {...register("RevenueLcAmount", { required: true })}
                        value={lcAmount} type='text' className={`form-control ${errors.RevenueLcAmount ?'is-invalid' : ''}`} 
                          readOnly />
                          {errors.RevenueLcAmount && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Remark</label>
                        <input {...register("RevenueRemark")} 
                        type="text" className={`form-control ${errors.RevenueRemark ? 'is-invalid':""} `} />
                        
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCost && (
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
                          <option value="Transporter">Transporter</option>
                          <option value="Vender">Vender</option>
                          <option value="Customer">Customer</option>
                          <option value="Airline">Airline</option>
                          <option value="CHA">CHA</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.CostpartyType && <span className="invalid-feedback">This field is required</span>}
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
                        value={revenueRateco} onChange={(e)=>setRevenueRateCo(e.target.value)}
                        className={`form-control ${errors.Costrate ? 'is-invalid' : ''}`} min={0} />
                        {errors.Costrate && <span className="invalid-feedback">This field is required</span>}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Gross FC Amt</label>
                        <input type="text" 
                         value={fcAmountCost} className={`form-control `} readOnly/>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-6">
                      <div className="form-group local-forms">
                        <label>Currency</label>
                        <select   className={`form-control `}
                         onChange={CurrencyChangeco} >
                          <option value="">select</option>
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
                        value={lcAmountco} type='text' className={`form-control ${errors.CostLcAmount ?'is-invalid' : ''}`} 
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
      )}
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

export default AddRevenueModal
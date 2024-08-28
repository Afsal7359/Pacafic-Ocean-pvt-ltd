import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import AddRevenueModal from './AddRevenueModal';

const BasicE = ({item,setItem,setAdditionalComp,setBasicComp,setServiceComp}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: item
      });
    const [AddRevenu,setAddRevenu]=useState(false)
    const [RevenueData,setRevenueData]=useState([])
    const [CostData,setCostData]=useState([]);

    const handleChange = (field, value) => {
        setItem(prevItem => ({ ...prevItem, [field]: value }));
      };
        // Update form values when item state changes
  React.useEffect(() => {
    for (const [key, value] of Object.entries(item)) {
      setValue(key, value);
    }
  }, [item, setValue]);
 
 
  const handleDelete = (index) => {
    console.log("Deleted", index);
  
    // Create a new array without the item at the specified index
    const newRevenueData = item.RevenueData.filter((_, i) => i !== index);
  
    // Update the item.RevenueData with the new array
    setItem(prevItem => ({
      ...prevItem,
      RevenueData: newRevenueData,
    }));
  };
  const handleDeleteCost = (index) => {
    console.log("Deleted", index);
  
    // Create a new array without the item at the specified index
    const newCostData = item.CostData.filter((_, i) => i !== index);
  
    // Update the item.RevenueData with the new array
    setItem(prevItem => ({
      ...prevItem,
      CostData: newCostData,
    }));
  };
 
      // const handleDelete = (index) => {
      //   const newRevenueData = RevenueData.filter((item, i) => i !== index);
      //   setRevenueData(newRevenueData);
      // };
      
      // const handleDeleteCost = (index) => {
      //   console.log("Deletde",index);
      //   const newCostData = CostData.filter((item, i) => i !== index);
      //   console.log("Deletde",index);
      //   setCostData(newCostData);
      // };
      const onSubmits =async(items)=>{
        try {
              console.log(item,"iiiiiiiii");
              setBasicComp(false);setAdditionalComp(false);setServiceComp(true)
        } catch (error) {
            
        }
      }
  return (
    <>
    <div className="container mt-2">
        <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmits)}>
                    <div className="row mt-4 mb-4" style={{borderBottom:"0.5px solid #EEEEEE"}}>
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Basic Details</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Service</label>
                          <select  className={`form-control ${errors.Service ? "is-invalid":""}`}
                          {...register("Service")}  onChange={(e) => handleChange("Service", e.target.value)}>
                            <option value={item.Service} >{item.Service}</option>
                            <option value="Air Freight Cross Trade">Air Freight Cross Trade</option>
                            <option value="Air Freight Export">Air Freight Export</option>
                            <option value="Air Freight Import">Air Freight Import</option>
                            <option value="Clearance & Delivery">Clearance & Delivery</option>
                            <option value="Sea Export Consolidation FCL">Sea Export Consolidation FCL</option>
                            <option value="Sea Freight Cross Trade">Sea Freight Cross Trade</option>
                            <option value="Sea Freight Export FCL">Sea Freight Export FCL</option>
                            <option value="Sea Freight Export LCL">Sea Freight Export LCL</option>
                            <option value="Sea Freight Import FCL">Sea Freight Import FCL</option>
                            <option value="Sea Freight Import LCL">Sea Freight Import LCL</option>
                            <option value="Sea Import Consolidation FCL">Sea Import Consolidation FCL</option>
                            <option value="Sea Import Consolidation LCL">Sea Import Consolidation LCL</option>
                          </select>
                          {errors.Service && <span className='invalid-feedback'>Service Type is required</span> }
                          </div>
                        </div>
                       <div className="row mb-4 " style={{borderBottom:"1px solid #EEE "}}>
                       <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Doc Type</label>
                            <select  className={`form-control ${errors.DocType ? 'is-invalid' : ""}`}
                            {...register("DocType")} 
                             onChange={(e) => handleChange("DocType", e.target)} >
                            <option value={item.DocType}>{item.DocType}</option>
                            <option value="House">House</option>
                            <option value="Master">Master</option>
                          </select>
                          {errors.DocType && <span className='invalid-feedback'>Doc Type is required</span> }
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Date</label>
                         <input {...register("Date")} type="date" 
                        onChange={(e) => handleChange("Date", e.target.value)}
                         className={`form-control ${errors.Date ? "is-invalid":""}`} />
                         {errors.Date  && <span className="invalid-feedback">Date is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Booking Source</label>
                            <select {...register("BookingSource")} 
                             className={`form-control ${errors.BookingSource ? "is-invalid":""}`}>
                            <option value={item.BookingSource} >{item.BookingSource}</option>
                            <option value="EMKL">EMKL</option>
                            <option value="TRADER">TRADER</option>
                            <option value="Direct Shipper">Direct Shipper</option>
                            <option value="Nrocc">Nrocc</option>
                            <option value="soc">soc</option>
                          </select>
                          {errors.BookingSource  && <span className="invalid-feedback">Booking Source is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Carrier Doc</label>
                           <input {...register("CarrierDocs")} type="text" 
                             onChange={(e) => handleChange("CarrierDocs", e.target.value)}
                            className={`form-control ${errors.CarrierDocs ? "is-invalid":""}`} />
                                  {errors.CarrierDocs  && <span className="invalid-feedback">Carrier Doc is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Nomination Agent</label>
                            <input 
                              {...register("NominationAgent", { required: true })} 
                              type="text" 
                              onChange={(e)=>handleChange("NominationAgent", e.target.value)}
                              className={`form-control ${errors.NominationAgent ? "is-invalid" : ""}`} 
                            />
                            {errors.NominationAgent && <span className="invalid-feedback">Nomination Agent is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Nomination OU</label>
                            <input 
                              {...register("NominationOU", { required: true })} 
                              type="text"
                              onChange={(e)=>handleChange("NominationOU", e.target.value)}
                              className={`form-control ${errors.NominationOU ? "is-invalid" : ""}`} 
                            />
                            {errors.NominationOU && <span className="invalid-feedback">Nomination OU is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Customer</label>
                            <input 
                              {...register("Customer", { required: true })} 
                              onChange={(e)=>handleChange("Customer", e.target.value)}
                              className={`form-control ${errors.Customer ? "is-invalid" : ""}`}
                           />
                            {errors.Customer && <span className="invalid-feedback">Customer is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Customer OU</label>
                            <input 
                              {...register("CustomerOU", { required: true })} 
                              className={`form-control ${errors.CustomerOU ? "is-invalid" : ""}`}
                              onChange={(e) => handleChange("CustomerOU", e.target.value)}
                            />
                            {errors.CustomerOU && <span className="invalid-feedback">Customer OU is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Sales Person</label>
                            <input 
                              {...register("SalesPerson", { required: true })} 
                              onChange={(e) => handleChange("SalesPerson", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.SalesPerson ? "is-invalid" : ""}`} 
                            />
                            {errors.SalesPerson && <span className="invalid-feedback">Sales Person is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Office Location</label>
                            <select 
                              {...register("OfficeLocation", { required: true })} 
                              className={`form-control ${errors.OfficeLocation ? "is-invalid" : ""}`}
                              onChange={(e) => handleChange("OfficeLocation", e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="Cochin">Cochin</option>
                              <option value="Chennai">Chennai</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="Coimbatore">Coimbatore</option>
                              <option value="Tuticorin">Tuticorin</option>
                              <option value="Surabaya">Surabaya</option>
                              <option value="Semarang">Semarang</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Belawan">Belawan</option>
                              <option value="Pontianak">Pontianak</option>
                              <option value="Palembang">Palembang</option>
                              <option value="Jambi">Jambi</option>
                              <option value="Kalimnthan">Kalimnthan</option>
                              <option value="Dumai">Dumai</option>
                              <option value="Bali">Bali</option>
                            </select>
                            {errors.OfficeLocation && <span className="invalid-feedback">Office Location is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Customer Service Person</label>
                            <input 
                              {...register("CustomerServicePerson", { required: true })} 
                              onChange={(e) => handleChange("CustomerServicePerson", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.CustomerServicePerson ? "is-invalid" : ""}`} 
                            />
                            {errors.CustomerServicePerson && <span className="invalid-feedback">Customer Service Person is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Customer Ref</label>
                            <input 
                              {...register("CustomerRef", { required: true })} 
                              onChange={(e) => handleChange("CustomerRef", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.CustomerRef ? "is-invalid" : ""}`} 
                            />
                            {errors.CustomerRef && <span className="invalid-feedback">Customer Ref is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Origin</label>
                            <input 
                              {...register("Origin", { required: true })} 
                              onChange={(e) => handleChange("Origin", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Origin ? "is-invalid" : ""}`} 
                            />
                            {errors.Origin && <span className="invalid-feedback">Origin is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Destination</label>
                            <input 
                              {...register("Destination", { required: true })} 
                              onChange={(e) => handleChange("Destination", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Destination ? "is-invalid" : ""}`} 
                            />
                            {errors.Destination && <span className="invalid-feedback">Destination is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                          <label>Load Port</label>
                            <select 
                               {...register("LoadPort", { required: true })} 
                               onChange={(e) => handleChange("LoadPort", e.target.value)}
                              className={`form-control ${errors.LoadPort ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="Cochin">Cochin</option>
                              <option value="Chennai">Chennai</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="Coimbatore">Coimbatore</option>
                              <option value="Tuticorin">Tuticorin</option>
                              <option value="Surabaya">Surabaya</option>
                              <option value="Semarang">Semarang</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Belawan">Belawan</option>
                              <option value="Pontianak">Pontianak</option>
                              <option value="Palembang">Palembang</option>
                              <option value="Jambi">Jambi</option>
                              <option value="Kalimnthan">Kalimnthan</option>
                              <option value="Dumai">Dumai</option>
                              <option value="Bali">Bali</option>
                            </select>
                            {errors.LoadPort && <span className="invalid-feedback">Load Port is Required</span>}
                          </div>
                        </div>
                        {/* <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Load Port</label>
                            <input 
                              {...register("LoadPort", { required: true })} 
                              onChange={(e) => handleChange("LoadPort", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.LoadPort ? "is-invalid" : ""}`} 
                            />
                            {errors.LoadPort && <span className="invalid-feedback">Load Port is Required</span>}
                          </div>
                        </div> */}
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Disch Port</label>
                            <input 
                              {...register("DischPort", { required: true })} 
                              onChange={(e) => handleChange("DischPort", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.DischPort ? "is-invalid" : ""}`} 
                            />
                            {errors.DischPort && <span className="invalid-feedback">Disch Port is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Load Type</label>
                            <select 
                              {...register("LoadType", { required: true })} 
                              onChange={(e) => handleChange("LoadType", e.target.value)}
                              className={`form-control ${errors.LoadType ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="CY/CY">CY/CY</option>
                              <option value="CFS">CFS</option>
                              <option value="Dot Door">Dot Door</option>
                              <option value="Dot Port">Dot Port</option>
                            </select>
                            {errors.LoadType && <span className="invalid-feedback">Load Type is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Pickup Term</label>
                            <select 
                              {...register("PickupTerm", { required: true })} 
                              onChange={(e) => handleChange("PickupTerm", e.target.value)}
                              className={`form-control ${errors.PickupTerm ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="CY/CY">CY/CY</option>
                              <option value="CFS">CFS</option>
                              <option value="Dot Door">Dot Door</option>
                              <option value="Dot Port">Dot Port</option>
                            </select>
                            {errors.PickupTerm && <span className="invalid-feedback">Pickup Term is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>TS Locally Delivered</label>
                            <select 
                              {...register("TSLocallyDelivered", { required: true })} 
                              onChange={(e) => handleChange("TSLocallyDelivered", e.target.value)}
                              className={`form-control ${errors.TSLocallyDelivered ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="NO">NO</option>
                            </select>
                            {errors.TSLocallyDelivered && <span className="invalid-feedback">TS Locally Delivered is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Carrier Doc</label>
                            <input 
                              {...register("CarrierDoc", { required: true })} 
                              onChange={(e) => handleChange("CarrierDoc", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.CarrierDoc ? "is-invalid" : ""}`} 
                            />
                            {errors.CarrierDoc && <span className="invalid-feedback">Carrier Doc is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Carrier Doc Date</label>
                            <input 
                              {...register("CarrierDocDate", { required: true })} 
                              onChange={(e) => handleChange("CarrierDocDate", e.target.value)}
                              type="date" 
                              className={`form-control ${errors.CarrierDocDate ? "is-invalid" : ""}`} 
                            />
                            {errors.CarrierDocDate && <span className="invalid-feedback">Carrier Doc Date is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>House Doc</label>
                            <input 
                              {...register("HouseDoc", { required: true })} 
                              onChange={(e) => handleChange("HouseDoc", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.HouseDoc ? "is-invalid" : ""}`} 
                            />
                            {errors.HouseDoc && <span className="invalid-feedback">House Doc is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>House Doc Date</label>
                            <input 
                              {...register("HouseDocDate", { required: true })} 
                              onChange={(e) => handleChange("HouseDocDate", e.target.value)}
                              type="date" 
                              className={`form-control ${errors.HouseDocDate ? "is-invalid" : ""}`} 
                            />
                            {errors.HouseDocDate && <span className="invalid-feedback">House Doc Date is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Customs Doc</label>
                            <input 
                              {...register("CustomsDoc", { required: true })}
                              onChange={(e) => handleChange("CustomsDoc", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.CustomsDoc ? "is-invalid" : ""}`} 
                            />
                            {errors.CustomsDoc && <span className="invalid-feedback">Customs Doc is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Carrier</label>
                            <input 
                              {...register("Carrier", { required: true })}
                              onChange={(e) => handleChange("Carrier", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Carrier ? "is-invalid" : ""}`} 
                            />
                            {errors.Carrier && <span className="invalid-feedback">Carrier is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Carrier Book Ref</label>
                            <input 
                              {...register("CarrierBookRef", { required: true })} 
                              onChange={(e) => handleChange("CarrierBookRef", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.CarrierBookRef ? "is-invalid" : ""}`} 
                            />
                            {errors.CarrierBookRef && <span className="invalid-feedback">Carrier Book Ref is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Commodity</label>
                            <input 
                              {...register("Commodity", { required: true })} 
                              onChange={(e) => handleChange("Commodity", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Commodity ? "is-invalid" : ""}`} 
                            />
                            {errors.Commodity && <span className="invalid-feedback">Commodity is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Vessel Name</label>
                            <input 
                              {...register("Vessel", { required: true })} 
                              onChange={(e) => handleChange("Vessel", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Vessel ? "is-invalid" : ""}`} 
                            />
                            {errors.Vessel && <span className="invalid-feedback">Vessel Name is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Voyage</label>
                            <input 
                              {...register("Voyage", { required: true })} 
                              onChange={(e) => handleChange("Voyage", e.target.value)}
                              type="text" 
                              className={`form-control ${errors.Voyage ? "is-invalid" : ""}`} 
                            />
                            {errors.Voyage && <span className="invalid-feedback">Voyage is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Freight Terms</label>
                            <select 
                              {...register("FreightTerms", { required: true })} 
                              onChange={(e) => handleChange("FreightTerms", e.target.value)}
                              className={`form-control ${errors.FreightTerms ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="prepaid">Prepaid</option>
                              <option value="Collect">Collect</option>
                            </select>
                            {errors.FreightTerms && <span className="invalid-feedback">Freight Terms is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Origin Agent</label>
                            <input 
                              {...register("OriginAgent", { required: true })} 
                              onChange={(e) => handleChange("OriginAgent", e.target.value)}
                              className={`form-control ${errors.OriginAgent ? "is-invalid" : ""}`}
                            />
                            {errors.OriginAgent && <span className="invalid-feedback">Origin Agent is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Delivery Agent</label>
                            <input 
                              {...register("DeliveryAgent", { required: true })} 
                              onChange={(e) => handleChange("DeliveryAgent", e.target.value)}
                              className={`form-control ${errors.DeliveryAgent ? "is-invalid" : ""}`}
                            />
                            {errors.DeliveryAgent && <span className="invalid-feedback">Delivery Agent is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Sea Shipment Type</label>
                            <select 
                              {...register("SeaShipmentType", { required: true })} 
                              onChange={(e) => handleChange("SeaShipmentType", e.target.value)}
                              className={`form-control ${errors.SeaShipmentType ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="FCL">FCL</option>
                              <option value="LCL">LCL</option>
                              <option value="Break Bulk">Break Bulk</option>
                            </select>
                            {errors.SeaShipmentType && <span className="invalid-feedback">Sea Shipment Type is Required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-3">
                          <div className="form-group local-forms">
                            <label>Delivery Term</label>
                            <select 
                              {...register("DeliveryTerm", { required: true })} 
                              onChange={(e) => handleChange("DeliveryTerm", e.target.value)}
                              className={`form-control ${errors.DeliveryTerm ? "is-invalid" : ""}`}
                            >
                              <option value="">Select</option>
                              <option value="CY/CY">CY/CY</option>
                              <option value="CFS">CFS</option>
                              <option value="Dot Door">Dot Door</option>
                              <option value="Dot Port">Dot Port</option>
                            </select>
                            {errors.DeliveryTerm && <span className="invalid-feedback">Delivery Term is Required</span>}
                          </div>
                        </div>

                       </div>

                       <div className="row mt-4">
                       <div className="col-12">
                            <div className="form-heading">
                              <h4>Flight Details</h4>
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Weight (KGS)</label>
                              <input
                                {...register("Weight", { required: true })}
                                onChange={(e) => handleChange("Weight", e.target.value)}
                                type="text"
                                className={`form-control ${errors.Weight ? "is-invalid" : ""}`}
                              />
                              {errors.Weight && <span className="invalid-feedback">Weight is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Volume (CBM)</label>
                              <input
                                {...register("Volume", { required: true })}
                                onChange={(e) => handleChange("Volume", e.target.value)}
                                type="text"
                                className={`form-control ${errors.Volume ? "is-invalid" : ""}`}
                              />
                              {errors.Volume && <span className="invalid-feedback">Volume is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Chrg. WT/Frt. Tones</label>
                              <input
                                {...register("ChargeWeight", { required: true })}
                                onChange={(e) => handleChange("ChargeWeight", e.target.value)}
                                type="text"
                                className={`form-control ${errors.ChargeWeight ? "is-invalid" : ""}`}
                              />
                              {errors.ChargeWeight && <span className="invalid-feedback">Charge Weight is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Hs Code</label>
                              <input
                                {...register("HsCode", { required: true })}
                                onChange={(e) => handleChange("HsCode", e.target.value)}
                                type="text"
                                className={`form-control ${errors.HsCode ? "is-invalid" : ""}`}
                              />
                              {errors.HsCode && <span className="invalid-feedback">HS Code is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Dangerous Goods</label>
                              <select
                                {...register("DangerousGoods", { required: true })}
                                onChange={(e) => handleChange("DangerousGoods", e.target.value)}
                                className={`form-control ${errors.DangerousGoods ? "is-invalid" : ""}`}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.DangerousGoods && <span className="invalid-feedback">Dangerous Goods is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>20.ft Container</label>
                              <input
                                {...register("Container20ft", { required: true })}
                                onChange={(e) => handleChange("Container20ft", e.target.value)}
                                type="number"
                                className={`form-control ${errors.Container20ft ? "is-invalid" : ""}`}
                              />
                              {errors.Container20ft && <span className="invalid-feedback">20.ft Container is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>40.ft Container</label>
                              <input
                                {...register("Container40ft", { required: true })}
                                onChange={(e) => handleChange("Container40ft", e.target.value)}
                                type="number"
                                className={`form-control ${errors.Container40ft ? "is-invalid" : ""}`}
                              />
                              {errors.Container40ft && <span className="invalid-feedback">40.ft Container is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>No of Pkgs</label>
                              <input
                                    className={`form-control ${errors.NumberOfPkgs ? "is-invalid" : ""}`}
                                {...register("NumberOfPkgs", { required: true })}
                                onChange={(e) => handleChange("NumberOfPkgs", e.target.value)}
                                type="number"
                          
                              />
                              {errors.NumberOfPkgs && <span className="invalid-feedback">Number of Packages is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-3 col-xl-3">
                            <div className="form-group local-forms">
                              <label>Package Type</label>
                              <select
                                {...register("PackageType", { required: true })}
                                className={`form-control ${errors.PackageType ? "is-invalid" : ""}`}
                                onChange={(e) => handleChange("PackageType", e.target.value)}
                               
                              >
                                <option value="">Select</option>
                                <option value="Bags">Bags</option>
                                <option value="Bales">Bales</option>
                                <option value="Barrels">Barrels</option>
                                <option value="Blocks">Blocks</option>
                                <option value="Boxes">Boxes</option>
                                <option value="Bundles">Bundles</option>
                                <option value="Cans">Cans</option>
                                <option value="Cartons">Cartons</option>
                                <option value="Cases">Cases</option>
                                <option value="Coils">Coils</option>
                                <option value="Crates">Crates</option>
                                <option value="Drums">Drums</option>
                                <option value="Packages">Packages</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Sets">Sets</option>
                                <option value="Sheets">Sheets</option>
                                <option value="Units">Units</option>
                              </select>
                              {errors.PackageType && <span className="invalid-feedback">Package Type is required</span>}
                            </div>
                          </div>

                        <div class="row justify-content-end">
                          <div class="col-12 col-md-6 col-xl-3 pb-4" >
                            <div class="doctor-submit text-end">
                              <a  class="btn btn-primary submit-form me-2"  onClick={()=>setAddRevenu(true)}>
                                Add Revenue & Cost Details
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        </div>
                        {item.RevenueData ? <div className="row mb-5">
                        <div className="table-responsive">
                        <table className="table border-0 custom-table comman-table datatable mb-0">
                              <thead  >
                                <tr style={{backgroundColor:"#8a2be22b"}}>
                                  <th>Sl No</th>
                                  <th>Job Item</th>
                                  <th>Desc</th>
                                  <th>UOM</th>
                                  <th>UOM TYPE</th>
                                  <th>Party</th>
                                  <th>Qut Ref</th>
                                  <th>Qty</th>
                                  <th>Rate</th>
                                  <th>Curr</th>
                                  <th>Gross FC Amt</th>
                                  <th>Exc Rate</th>
                                  <th>LC Amount</th>
                                  <th>Remark</th>
                                  <th>Tariff Term</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.RevenueData?item.RevenueData.map((data,index)=>(
                                  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.code}</td>
                                    <td>{data.description}</td>
                                    <td>{data.uom}</td>
                                    <td>{data.uomType}</td>
                                    <td>{data.Revenuparty}</td>
                                    <td>-</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.Revenurate}</td>
                                    <td>{data.RevenueCurrency}</td>
                                    <td>{data.RevenuFcGrossAmt}</td>
                                    <td>{data.RevenueExRate}</td>
                                    <td>{data.RevenueLcAmount}</td>
                                    <td>{data.RevenueRemark}</td>
                                    <td>{data.tariffTerm}</td>
                                    <td>
                                    <a className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</a>
                                    </td>
                                  </tr>
                                )):""}
                              </tbody>
                            </table>
                          </div>
                        </div>: <p className='text-center text-danger mb-5'>No Revenue Data Available</p> }
                        {item.CostData ? <div className="row mt-5">
                        <div className="table-responsive">
                        <table className="table border-0 custom-table comman-table datatable mb-0">
                              <thead>
                                <tr  style={{backgroundColor:"#8a2be22b"}}>
                                  <th>Sl No</th>
                                  <th>Job Item</th>
                                  <th>Desc</th>
                                  <th>UOM</th>
                                  <th>UOM TYPE</th>
                                  <th>Party</th>
                                  <th>Qut Ref</th>
                                  <th>Qty</th>
                                  <th>Rate</th>
                                  <th>Curr</th>
                                  <th>Gross FC Amt</th>
                                  <th>Exc Rate</th>
                                  <th>LC Amount</th>
                                  <th>Remark</th>
                                  <th>Tariff Term</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.CostData?item.CostData.map((data,index)=>(
                                  <tr key={index}>
                                     <td>{index+1}</td>
                                    <td>{data.code}</td>
                                    <td>{data.description}</td>
                                    <td>{data.uom}</td>
                                    <td>{data.uomType}</td>
                                    <td>{data.Costparty}</td>
                                    <td>-</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.Costrate}</td>
                                    <td>{data.CostCurrency}</td>
                                    <td>{data.CostFcGrossAmt}</td>
                                    <td>{data.CostExRate}</td>
                                    <td>{data.CostLcAmount}</td>
                                    <td>{data.CostRemark}</td>
                                    <td>{data.tariffTerm}</td>
                                    <td>
                                    <div className='btn btn-danger' onClick={()=>handleDeleteCost(index)}>Delete</div>
                                    </td>
                                  </tr>
                                )):""}
                              </tbody>
                            </table>
                          </div>
                        </div>: <p className='text-center text-danger mt-5'>No Cost Data Available</p> }
                        <p className='text-end text-danger mt-5'>
                      Please check the data you filled above once more. <br /> If you click "Next", you will not be allowed to come back.
                    </p>
                        <div class="row justify-content-end ">
                          <div class="col-12 col-md-6 col-xl-3 pb-4" >
                            <div class="doctor-submit text-end">
                              
                              <button type="submit"  class="btn btn-primary  me-2">
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
        {AddRevenu&& <AddRevenueModal item={item} setModal={setAddRevenu} RevenueData={RevenueData} CostData={CostData} setRevenueData={setRevenueData} setCostData={setCostData}/>}
    </>
  )
}

export default BasicE
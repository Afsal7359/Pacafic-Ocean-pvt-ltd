import React, { useEffect, useState } from 'react'
import { GetAllCurrency } from '../../../ApiCalls/Currency';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const EditContainer = ({setModal,item,index,setItem,data}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  
    // Prepopulate form fields when editing data
    useEffect(() => {
      if (item) {
     
        setValue("containerNo",item.containerNo)
        setValue("containerType",item.containerType)
        setValue("customSeal",item.customSeal)
        setValue("agentSeal",item.agentSeal)
        setValue("tareWeight",item.tareWeight)
        setValue("cargoWeight",item.cargoWeight)
        setValue("netWeight",item.netWeight)
        setValue("volumeCo",item.volumeCo)
        setValue("packageType",item.packageType)
        setValue("numberOfUnits",item.numberOfUnits)
        // Add other fields as needed
      }
  

    }, [ item ]);
  
   
  
    const onSubmit = (datas) => {
        // Map through the ContainerData array to update the specific item based on index
        const UpdateContainerData = data.map((item, Uindex) => {
          // Check if the current index matches the selected index for editing
          if (Uindex === index) {
            // Return the updated item with new data
            return {
              ...item,
              containerNo: datas.containerNo,
              containerType: datas.containerType,
              customSeal: datas.customSeal,
              agentSeal: datas.agentSeal,
              tareWeight: datas.tareWeight,
              cargoWeight: datas.cargoWeight,
              netWeight: datas.netWeight,
              volumeCo: datas.volumeCo,
              packageType: datas.packageType,
              numberOfUnits: datas.numberOfUnits
            };
          }
          // Return the original item for all other indices
          return item;
        });
      
        console.log(UpdateContainerData); // To verify the updated data
      
        // Update the state with the modified array
        setItem((prevState) => ({
          ...prevState, // Spread previous state if there are other properties in it
          ContainerData: UpdateContainerData // Update ContainerData with the modified array
        }));
      
        // Optionally close the modal after saving
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
            <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-4 mb-4" style={{border:"1px solid #EEE" ,borderRadius:"15px"}}>
                        <div className="col-12 mt-4">
                          <div className="form-heading">
                            <h4>Container Details </h4>
                          </div>
                        </div>
                        <div className="row mt-4 mb-4" style={{ borderBottom: "0.5px solid #EEEEEE" }}>
                          
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Container No</label>
                              <input
                                type="text"
                                className={`form-control ${errors.containerNo ? "is-invalid" : ""}`}
                                {...register("containerNo",{required:true})}
                              />
                              {errors.containerNo && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Container Type</label>
                              <select
                                className={`form-control ${errors.containerType ? "is-invalid" : ""}`}
                                {...register("containerType", { required: true })}
                              >
                                <option value="">Select</option>
                                <option value="20FT">20FT</option>
                                <option value="40STD">40STD</option>
                                <option value="40HC">40HC</option>
                                <option value="20FR">20FR</option>
                                <option value="40FR">40FR</option>
                                <option value="45GP">45GP</option>
                                <option value="20OT">20OT</option>
                                <option value="40OT">40OT</option>
                                <option value="20RF">20RF</option>
                                <option value="40RF">40RF</option>
                                <option value="ISO TANK">ISO TANK</option>
                              </select>
                              {errors.containerType && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Custom Seal</label>
                              <input
                                type="text"
                                className={`form-control ${errors.customSeal ? "is-invalid" : ""}`}
                                {...register("customSeal", { required: true })}
                              />
                              {errors.customSeal && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Agent Seal</label>
                              <input
                                type="text"
                                className={`form-control ${errors.agentSeal ? "is-invalid" : ""}`}
                                {...register("agentSeal", { required: true })}
                              />
                              {errors.agentSeal && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Tare Wt(kgs)</label>
                              <input
                                type="number"
                                className={`form-control ${errors.tareWeight ? "is-invalid" : ""}`}
                                {...register("tareWeight", { required: true })}
                              />
                              {errors.tareWeight && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Cargo Wt(kgs)</label>
                              <input
                                type="number"
                                className={`form-control ${errors.cargoWeight ? "is-invalid" : ""}`}
                                {...register("cargoWeight", { required: true })}
                              />
                              {errors.cargoWeight && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Net Wt(kgs)</label>
                              <input
                                type="number"
                                className={`form-control ${errors.netWeight ? "is-invalid" : ""}`}
                                {...register("netWeight", { required: true })}
                              />
                              {errors.netWeight && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Volume</label>
                              <input
                                type="text"
                                className={`form-control ${errors.volumeCo ? "is-invalid" : ""}`}
                                {...register("volumeCo", { required: true })}
                              />
                              {errors.volumeCo && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Pkg type</label>
                              <select
                                className={`form-control ${errors.packageType ? "is-invalid" : ""}`}
                                {...register("packageType", { required: true })}
                              >
                                <option value="">Select</option>
                                <option value="Bags">Bags</option>
                                <option value="Bales">Bales</option>
                                <option value="Barrels">Barrels</option>
                                <option value="Blocks">Blocks</option>
                                <option value="Boats">Boats</option>
                                <option value="Bobbin">Bobbin</option>
                                <option value="Boxes">Boxes</option>
                              </select>
                              {errors.packageType && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6">
                            <div className="form-group local-forms">
                              <label>No Of Unit</label>
                              <input
                                type="number"
                                className={`form-control ${errors.numberOfUnits ? "is-invalid" : ""}`}
                                {...register("numberOfUnits", { required: true })}
                              />
                              {errors.numberOfUnits && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-6 ">
                          <div className="form-group local-forms">
                          <button type='submit' className='btn btn-success me-5' >Save</button>
                            {/* <a className='btn btn-danger'>Delete</a> */}
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

export default EditContainer
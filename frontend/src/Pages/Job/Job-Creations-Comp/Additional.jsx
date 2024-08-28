import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


const Additional = ({setAdditionalComp,setBasicComp,setServiceComp,FormSubmition,setFormData,formData}) => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const [MarkandNumber,setMarkAndNumber]=useState("")
  const [cargoDescription,setCargoDescription]=useState("")
  const [IgmNumber,setIgmNumber]=useState("")
  const [IgmDate,setIgmDate]=useState("")
  const [ContainerData,setContainerData]=useState([])

  const handleDelete = (index) => {
    const updatedContainerData = [...ContainerData];
    updatedContainerData.splice(index, 1); // Remove the item at index
    setContainerData(updatedContainerData); // Update state with the new array
  };


  const handlecontainer=(datas)=>{
    try {
      console.log(datas,"submitted Data");
      ContainerData.push(datas)
      reset()
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit=()=>{
    try {
    console.log("hhhhhhhhhhh");
    const forms ={
      MarkandNumber:MarkandNumber,
      cargoDescription:cargoDescription,
      IgmNumber:IgmNumber,
      IgmDate:IgmDate,
      ContainerData:ContainerData
    }
    console.log(forms,"fffffffffffffffffooooooooooooooooooooooooorrrrrrrrrrrrrrrrrr");
      const Data ={...formData,...forms}
      console.log(Data,"abbbbaaa");
     setFormData(Data);
     FormSubmition(Data);
    console.log(Data,"Data");
    } catch (error) {
      console.log(error);
    }
  }

 
  return (
    <>
    <div className="container mt-2">
      <div className="row">
        <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Additional Details</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-6">
                          <div className="form-group local-forms">
                            <label> Mark and Number</label>
                           <textarea   className={`form-control ${errors.Markandnumber ? "is-invalid" : ""}`}
                            rows={3} onChange={(e)=>setMarkAndNumber(e.target.value)} required
                             />
                          
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-6">
                          <div className="form-group local-forms">
                            <label> Cargo Description</label>
                           <textarea onChange={(e)=>setCargoDescription(e.target.value)} 
                           className='form-control' rows={3} />
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-4">
                          <div className="form-group local-forms">
                            <label> IGM Number</label>
                           <input type="text" onChange={(e)=>setIgmNumber(e.target.value)} 
                            className={`form-control`} required />
                          </div>
                        </div>
                         <div className="col-12 col-md-5 col-xl-4">
                          <div className="form-group local-forms">
                            <label> IGM Date</label>
                           <input type="date" onChange={(e)=>setIgmDate(e.target.value)}
                            className={`form-control `}  required/>
                          
                          </div>
                        </div>
                        </div>
                        </form>
                      <form onSubmit={handleSubmit(handlecontainer)}>
                        <div className="row mt-4 mb-4" style={{border:"1px solid #EEE" ,borderRadius:"15px"}}>
                        <div className="col-12 mt-4">
                          <div className="form-heading">
                            <h4>Container Details </h4>
                          </div>
                        </div>
                        <div className="row mt-4 mb-4" style={{ borderBottom: "0.5px solid #EEEEEE" }}>
                          
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                                <option value="ISO TANK">ISO TANK</option>
                              </select>
                              {errors.containerType && <span className="text-danger">This field is required</span>}
                            </div>
                          </div>
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3">
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
                          <div className="col-12 col-md-5 col-xl-3 ">
                          <div className="form-group local-forms">
                          <button type='submit' className='btn btn-success me-3' >Add</button>
                            {/* <a className='btn btn-danger'>Delete</a> */}
                          </div>
                        </div>
                        </div>
                       
                        
                        {ContainerData.length!==0?<div className="row mb-5">
                        <div className="table-responsive">
                        <table className="table border-0 custom-table comman-table datatable mb-0">
                              <thead  >
                                <tr style={{backgroundColor:"#8a2be22b"}}>
                              
                                  <th>Container No</th>
                                  <th>Cont Type</th>
                                  <th>Cust Seal</th>
                                  <th>Agent Seal</th>
                                  <th>Tare Wt(kgs)</th>
                                  <th>Cargo Wt(kgs)</th>
                                  <th>Net Wt(kgs)</th>
                                  <th>Volume</th>
                                  <th>Pkg type</th>
                                  <th>No Of unit</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ContainerData?ContainerData.map((item,index)=>(
                                  <tr key={index}>
                                    <td>{item.containerNo}</td>
                                    <td>{item.containerType}</td>
                                    <td>{item.customSeal}</td>
                                    <td>{item.agentSeal}</td>
                                    <td>{item.tareWeight}</td>
                                    <td>{item.cargoWeight}</td>
                                    <td>{item.netWeight}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.packageType}</td>
                                    <td>{item.numberOfUnits}</td>
                                    <td>
                                      <button className='btn btn-danger'  onClick={() => handleDelete(index)} >Delete</button>
                                    </td>
                                  </tr>
                                )):""}
                              </tbody>
                            </table>
                          </div>
                        </div>: <p className='text-center text-danger'>Container Data not Available </p> }

                        </div>
                         </form>
                           <div class="row justify-content-between">
                  <div class="col-6 col-md-3 mb-5">
                    <div class="doctor-submit text-start">
                      {/* <button type="submit" data-bs-dismiss="modal" class="btn btn-primary submit-form" onClick={()=>{
                        setBasicComp(false); setAdditionalComp(false); setServiceComp(true)
                      }}>
                        Back
                      </button> */}
                    </div>
                  </div>
                  <div class="col-6 col-md-3 text-end">
                    <div class="doctor-submit">
                      <button type="submit" data-bs-dismiss="modal" class="btn btn-primary" onClick={onSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Additional
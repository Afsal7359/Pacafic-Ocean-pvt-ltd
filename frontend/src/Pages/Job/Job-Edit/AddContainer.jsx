import React from 'react'
import { useForm } from 'react-hook-form';

const AddContainer = ({item,setItem}) => {
    const { register, handleSubmit  , reset , formState: { errors } } = useForm();
    const handlecontainer=(datas)=>{
        try {
          console.log(datas,"submitted Data");
          const updatedContainerDatas = [...item.ContainerData,datas];
          setItem(prevItem => ({
            ...prevItem,
            ContainerData: updatedContainerDatas
          }));
          // item.ContainerData.push(datas)
          reset();
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
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
                                <option value="ISO TANK">ISO TANK</option>
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
                       
                        
                        {item.ContainerData.length!==0?<div className="row mb-5">
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
                                {item.ContainerData?item.ContainerData.map((data,index)=>(
                                  <tr key={index}>
                                    <td>{data.containerNo}</td>
                                    <td>{data.containerType}</td>
                                    <td>{data.customSeal}</td>
                                    <td>{data.agentSeal}</td>
                                    <td>{data.tareWeight}</td>
                                    <td>{data.cargoWeight}</td>
                                    <td>{data.netWeight}</td>
                                    <td>{data.volume}</td>
                                    <td>{data.packageType}</td>
                                    <td>{data.numberOfUnits}</td>
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
    </>
  )
}

export default AddContainer
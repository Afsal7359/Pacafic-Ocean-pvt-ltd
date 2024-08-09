import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import AddContainer from './AddContainer';

const AdditionalE = ({setAdditionalComp,setBasicComp,setServiceComp,item,setItem,FormSubmition}) => {
  const { register, handleSubmit , setValue , reset , formState: { errors } } = useForm({
    defaultValues: item
  });
    const [MarkandNumber,setMarkAndNumber]=useState("")
    const [cargoDescription,setCargoDescription]=useState("")
    const [IgmNumber,setIgmNumber]=useState("")
    const [IgmDate,setIgmDate]=useState("")
    const [ContainerData,setContainerData]=useState([])

    const handleDelete = (index) => {
      const updatedContainerData = [...item.ContainerData];
      updatedContainerData.splice(index, 1); // Remove the item at index
    
      // Update item state with the new ContainerData array
      setItem(prevItem => ({
        ...prevItem,
        ContainerData: updatedContainerData
      }));
    };

    const handleChange = (field, value) => {
      setItem(prevItem => ({ ...prevItem, [field]: value }));
    };
      // Update form values when item state changes
React.useEffect(() => {
  for (const [key, value] of Object.entries(item)) {
    setValue(key, value);
  }
}, [item, setValue]);

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

    const onSubmit=(data)=>{
        try {
            console.log(item,"ItesmsFinal Submit");
            FormSubmition()
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
                           <textarea  {...register("MarkandNumber")}  className={`form-control ${errors.Markandnumber ? "is-invalid" : ""}`}
                             onChange={(e) => handleChange("MarkandNumber", e.target.value)} rows={3}
                             />
                          
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-6">
                          <div className="form-group local-forms">
                            <label> Cargo Description</label>
                           <textarea  {...register("cargoDescription")} 
                             onChange={(e) => handleChange("cargoDescription", e.target.value)} 
                           className='form-control' rows={3} />
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-4">
                          <div className="form-group local-forms">
                            <label> IGM Number</label>
                           <input type="text"  {...register("IgmNumber")} 
                            onChange={(e) => handleChange("IgmNumber", e.target.value)}
                            className={`form-control`} required />
                          </div>
                        </div>
                         <div className="col-12 col-md-5 col-xl-4">
                          <div className="form-group local-forms">
                            <label> IGM Date</label>
                           <input type="date"  {...register("IgmDate")} 
                           onChange={(e) => handleChange("IgmDate", e.target.value)}
                            className={`form-control `}  required/>
                          
                          </div>
                        </div>
                        </div>
                        </form>
                      <AddContainer item={item} setItem={setItem}/>
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

export default AdditionalE
import React, { useState } from 'react'
import Basic from './Job-Creations-Comp/Basic'
import Additional from './Job-Creations-Comp/Additional'
import Service from './Job-Creations-Comp/Service'
import './Style.css'
import { AddJobs } from '../../ApiCalls/Job'
import { toast } from 'react-toastify'

const JobCreation = ({settable,setJob,JobDataFetch}) => {

    const [basicComp,setBasicComp]=useState(true)
    const [serviceComp,setServiceComp]=useState(false)
    const [additionalComp,setAdditionalComp]=useState(false)
    const [formData,setFormData]=useState({})

    const FormSubmition =async(data)=>{
      try {
        console.log(data,"FormDataaaa");
        setJob(false);settable(true)
        const response = await AddJobs(data)
        if(response.success){
          toast.success(`${response.message}`)
          JobDataFetch();
        }else{
          toast.error(`${response.message}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(formData,"MainFormDataaaaaaa");
  return (
    <>
       <div className="container">
        <div className="row">
            <div className="inline-block">
                <button  className={`btns ${basicComp ? " basic-active" : ""} me-3`}  >Basic</button>
                <button   className={`btns me-3 ${serviceComp ? "basic-active" : "btns"}`} >Service /Ops Details</button>
                <button   className={`btns me-3 ${additionalComp ? "basic-active" : ""}`}  >Additional Details</button>
            </div>
        </div>
        </div>
        {basicComp &&<div> <Basic setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp} formData={formData} setFormData={setFormData}/>
            {/* <div class="row justify-content-end">
                          <div class="col-12 col-md-6 col-xl-3 pb-4" >
                            <div class="doctor-submit text-end">
                              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary submit-form me-2"  onClick={()=>{
                                setBasicComp(false); setAdditionalComp(false); setServiceComp(true)
                            }}>
                                Next
                              </button>
                            </div>
                          </div>
                        </div> */}
                     </div>}

       
                     {serviceComp && (
                        <div>
                          <Service setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp} formData={formData} setFormData={setFormData}/>
                         
                        </div>
                      )}
   

          {additionalComp && <div>
                  <Additional FormSubmition={FormSubmition} setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp} formData={formData} setFormData={setFormData}/> 
                 
               </div>}       
    </>
  )
}

export default JobCreation
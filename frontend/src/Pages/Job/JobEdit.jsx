import React, { useEffect, useState } from 'react'
import BasicE from './Job-Edit/BasicE'
import AdditionalE from './Job-Edit/AdditionalE'
import { useLocation } from 'react-router-dom'
import Service from './Job-Edit/Service'
import { EditJobApi } from '../../ApiCalls/Job'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const JobEdit = () => {
  const navigate = useNavigate();
    const [basicComp,setBasicComp]=useState(true)
    const [serviceComp,setServiceComp]=useState(false)
    const [additionalComp,setAdditionalComp]=useState(false)
    const [formData,setFormData]=useState({})

    const [item,setItem]=useState([])
    const location = useLocation();
    useEffect(()=>{
      if(location.state){
        setItem(location.state);
      }
    },[])
    
    const FormSubmition =async()=>{
        try {
            console.log(item,"item");
            const response = await EditJobApi(item);
            if(response.success){
              toast.success(`${response.message}`)
              navigate('/job');
              console.log(response);
            }else{
              toast.error(`${response.error}`)
              console.log(response,"res");
            }
        } catch (error) {
            console.log(error);
        }
    }
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
        {basicComp &&<div> <BasicE item={item} setItem={setItem} setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp} formData={formData} setFormData={setFormData}/>
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
                          <Service item={item} setItem={setItem}  setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp} formData={formData} setFormData={setFormData}/>
                         
                        </div>
                      )}
   

          {additionalComp && <div>
                  <AdditionalE FormSubmition={FormSubmition} setBasicComp={setBasicComp} setAdditionalComp={setAdditionalComp} setServiceComp={setServiceComp}  item={item} setItem={setItem}/> 
                 
               </div>}  
    </>
  )
}

export default JobEdit
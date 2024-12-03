import React from 'react'
import { DeleteJobApi } from '../../../ApiCalls/Job';
import { toast } from 'react-toastify';

const DeleteModal = ({setModal,id,JobDataFetch}) => {
    const handleDelete = async()=>{
        try {
            const response = await DeleteJobApi(id);
            if(response.success){ 
                 JobDataFetch();
                toast.success('Job Deleted Successfully')
                setModal(false);
            }else{
                toast.error(`${response.message}`)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className="modal" tabIndex="10" role="dialog" style={{ display: 'block', backdropFilter: 'blur(10px)'  }}>
<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px' }}>
        <div className="modal-content" >
            <div className="modal-header">
              <button className="btn close submit-form" data-bs-dismiss="modal" onClick={()=>setModal(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          <center> <div className='p-5'>
                <p className='text-red'>If you want to delete this Job Please Confirm </p>

                       <button type="submit"  data-bs-dismiss="modal"   onClick={()=>setModal(false)}  class="btn btn-success submit-form me-2">
                                Back
                              </button>
                              <button type="submit" data-bs-dismiss="modal" class="btn btn-danger submit-form me-2" onClick={()=>handleDelete()}>
                                submit
                              </button>
                </div>	</center> 
              </div>
          </div>
    </div>
  )
}

export default DeleteModal
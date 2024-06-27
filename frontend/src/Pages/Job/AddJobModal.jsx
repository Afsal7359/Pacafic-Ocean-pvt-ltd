import React from 'react'

const AddJobModal = ({setModal}) => {
  return (
    <>
 <div className="modal" tabIndex="10" role="dialog" style={{ display: 'block', backdropFilter: 'blur(1px)'  }}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px' }}>
        <div className="modal-content" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)' }}>
            <div className="modal-header">
              <button className="btn close submit-form" data-bs-dismiss="modal" onClick={()=>setModal(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form >
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>New Job</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Book Ref.</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Book Date</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Customer Ref.</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Customer</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Carrier Doc</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>House Doc</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Customs Doc </label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Contact Number</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>SP Name</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Origin </label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label> Destination</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label> Quotation</label>
                          <input type="text" className='form-control' />
                          </div>
                        </div>
                        
                        <div className="col-12 col-md-6 col-xl-3">
                          <div className="doctor-submit text-end">
                            <button type="submit" data-bs-dismiss="modal"  className=" btn btn-primary submit-form me-2">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default AddJobModal
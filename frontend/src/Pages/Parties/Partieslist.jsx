import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';

import AddPartiesModal from './AddPartiesModal';
import { DeleteParties, GetAllParties } from '../../ApiCalls/Parties';
import { toast } from 'react-toastify';
import EditPartiesModal from './EditPartiesModal';

const Partieslist = () => {
    const [AddModal, setAddModal] = useState(false)
    const [Parties, setParties] = useState([])
    const [filteredParties, setFilteredParties] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isloading, setIsloading] = useState(true)
    const [EditModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState()

    const PartiesDataFetch = async () => {
        try {
            const response = await GetAllParties();
            if (response.success) {
                setParties(response.data)
                setFilteredParties(response.data)
                setIsloading(false)
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        PartiesDataFetch()
    }, [])

    // Search functionality
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchTerm(searchTerm)

        const filtered = Parties.filter(party => {
            return (
                party.name?.toLowerCase().includes(searchTerm) ||
                party.gst?.toLowerCase().includes(searchTerm) ||
                party.number1?.toLowerCase().includes(searchTerm) ||
                party.email1?.toLowerCase().includes(searchTerm)
            )
        })
        setFilteredParties(filtered)
    }

    const handleDeleteClick = async (item) => {
        setIsloading(true)
        try {
            const response = await DeleteParties(item);
            if (response.success) {
                toast.success(`${response.message}`)
                PartiesDataFetch()
                setIsloading(false)
            } else {
                console.log(response);
                setIsloading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditClick = (item, index) => {
        try {
            setEditModal(true);
            setEditData(item);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>{isloading ? (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        ) : <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-table show-entire">
                        <div className="card-body">
                            <div className="page-table-header mb-2">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="doctor-table-blk">
                                            <h3>Parties List</h3>
                                            <div className="doctor-search-blk">
                                                <div className="top-nav-search table-search-blk">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search here"
                                                            value={searchTerm}
                                                            onChange={handleSearch}
                                                        />
                                                        <a className="btn">
                                                            <img src={searchicon} alt="" />
                                                        </a>
                                                    </form>
                                                </div>
                                                <div className="add-group">
                                                    <a className="btn btn-primary add-pluss ms-2" onClick={() => { setAddModal(true) }}>
                                                        <img src={addicon} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table border-0 custom-table comman-table datatable mb-0">
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Address Number</th>
                                        <th>NPWP</th>
                                        <th>Contact No</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParties.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-end">
                                                <div className="dropdown dropdown-action">
                                                    <a
                                                        href="#"
                                                        className="action-icon dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fa fa-ellipsis-v"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a className="dropdown-item" data-bs-toggle="modal" onClick={() => handleEditClick(item, index)}
                                                            data-bs-target="#delete_patients">
                                                            <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                                                        </a>
                                                        <a className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_patient"
                                                            onClick={() => handleDeleteClick(item._id)}
                                                        >
                                                            <i className="fa fa-trash-alt m-r-5"></i> Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td >{item.address}</td>
                                            <td>{item.gst}</td>
                                            <td>{item.number1}</td>
                                            <td>{item.email1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {AddModal && <AddPartiesModal setModal={setAddModal} setParties={setParties} />}
            {EditModal && <EditPartiesModal setModal={setEditModal} partyData={editData} PartiesDataFetch={PartiesDataFetch} />}
        </>}</>
    )
}

export default Partieslist
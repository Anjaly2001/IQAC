import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../Sidebar';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { list_tags,delete_tag } from '../../axios/api';
import DOMPurify from 'dompurify'; // Import DOMPurify
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ListTag() {
    const [tags, setTags] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await list_tags();  // Update the endpoint as needed
            setTags(response);  // Adjust if the data structure is different
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching tags:', error);
            toast.error('Failed to fetch tags. Please try again.');
        }
    };

    const handleSearchChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    const handleEdit = (tag) => {
        // Implement edit functionality
        console.log('Edit tag with ID:', tag);
        navigate('/createTag', { state: { tag } }); 
    };

    


    const handleDelete = async (tagId) => {
        try {
            await delete_tag(tagId);  // Update the endpoint as needed
            toast.success('Tag deleted successfully');
            fetchTags();  // Refresh the list
        } catch (error) {
            console.error('Error deleting tag:', error);
            toast.error('Failed to delete tag. Please try again.');
        }
    };

     // Define actionBodyTemplate inside the component scope
     const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <button
                    className="btn btn-link"
                    onClick={() => handleEdit(rowData)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDelete(rowData.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        );
    };

    // Custom body template for rendering HTML content
    const descriptionBodyTemplate = (rowData) => {
        return (
            <div dangerouslySetInnerHTML={{ __html: rowData.description }} />
        );
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3 p-5">
                        <div className="d-flex justify-content-center mb-4">
                            <h4 className="fw-bold text-center">Tags List</h4>
                        </div>
                        <div className="d-flex justify-content-end mb-4">
                            <div className="input-group" style={{ width: '300px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search tags"
                                    value={globalFilter}
                                    onChange={handleSearchChange}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <DataTable 
                                value={tags}
                                paginator 
                                rows={10} 
                                dataKey="id" 
                                globalFilter={globalFilter}
                                emptyMessage="No tags found."
                            >
                                <Column field="name" header="Tag Name" sortable />
                                <Column field="description" header="Description" body={descriptionBodyTemplate} sortable />
                                <Column header="Actions" body={actionBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

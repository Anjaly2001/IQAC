import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import AdminDashboard from '../Admin/AdminDashboard';

export default function ListTag() {
    const [tags, setTags] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        // Fetch tags data from backend or use dummy data
        const dummyData = [
            { id: 1, tagName: 'Tag1', description: 'Description for Tag1' },
            { id: 2, tagName: 'Tag2', description: 'Description for Tag2' },
            // Add more dummy data here
        ];
        setTags(dummyData);
    }, []);

    const header = (
        <div className="table-header d-flex justify-content-between">
            <h2>Tags List</h2>
            {/* <Button label="Add New Tag" icon="pi pi-plus" className="p-button-success" /> */}
            <span className="p-input-icon-left">
                <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Search..."
                    style={{ paddingLeft: '2rem' }} // Adjust padding for icon
                />
                <i className="fa fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </span>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3">
                        <DataTable value={tags} paginator rows={10} header={header} globalFilter={globalFilter} className="p-datatable-customers">
                            <Column field="tagName" header="Tag Name" sortable />
                            <Column field="description" header="Description" sortable />
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <div>
                                        <Button 
                                            icon="fa fa-edit" 
                                            className="p-button-rounded p-button-warning mr-2" 
                                        />
                                        <Button 
                                            icon="fa fa-trash" 
                                            className="p-button-rounded p-button-danger" 
                                        />
                                    </div>
                                )}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

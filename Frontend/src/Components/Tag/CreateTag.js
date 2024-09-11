import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import axios from 'axios';  // Import Axios for HTTP requests
import { create_tag } from '../../axios/api';
import Sidebar from '../../Sidebar';
import { toast } from "react-toastify";

export default function CreateTag() {
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');


    const handleSave = async () => {
        try {
            const response = await create_tag({ name: tagName, description: description })
            console.log('Tag created successfully:', response);
            toast.success('Registered Successfully');
            // Optionally, handle success (e.g., reset form or show a success message)
        } catch (error) {
            console.error('Error creating tag:', error);
            // Optionally, handle error (e.g., show an error message)
        }
    };

    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3 p-6">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <h2>Create Tag</h2>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="tagName">Tag Name{renderAsterisk()}</label>
                                <InputText
                                    id="tagName"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                    placeholder="Enter tag name" 
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description{renderAsterisk()}</label>
                                <Editor
                                    id="description"
                                    value={description}
                                    onTextChange={(e) => setDescription(e.htmlValue)}
                                    style={{ height: '320px' }}
                                    placeholder="Enter description here..."
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100">
                                <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

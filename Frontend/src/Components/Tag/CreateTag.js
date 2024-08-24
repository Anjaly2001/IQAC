import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import AdminDashboard from "../Admin/AdminDashboard";

export default function CreateTag() {
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        // Logic to save the tag name and description
        console.log("Tag Name:", tagName);
        console.log("Description:", description);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <AdminDashboard />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <h2>Create Tag</h2>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="tagName">Tag Name</label>
                                <InputText
                                    id="tagName"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                    placeholder="Enter tag name"
                                    className="w-100"
                                />
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description</label>
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

import React, { useState } from 'react';
import './css/form.css'
const Form = () => {
    const [formData, setFormData] = useState({
        topic: '',
        title: '',
        examples: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        console.log(formData);
    };
    if (isSubmitted) {
        // setIsSubmitted(false);
        return <div></div>;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label>
                Тема:
                <input
                    type="text"
                    value={formData.topic}
                    name="topic"
                    onChange={handleChange}
                />
            </label>
            <label>
                Название:
                <input
                    type="text"
                    value={formData.title}
                    name="title"
                    onChange={handleChange}
                />
            </label>
            <label className="placeholder">
                Примеры:
                <textarea
                    value={formData.examples}
                    name="examples"
                    onChange={handleChange}
                />
            </label>
            <button type="submit" className="submit">Отправить</button>
        </form>
    );
};

export default Form;
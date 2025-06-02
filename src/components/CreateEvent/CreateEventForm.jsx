import React, { useState } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import styles from "./CreateEventForm.module.css";
import { useCreateEvent } from '../../hooks/useCreateEvent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

const CreateEventForm = () => {
  const { createEvent, loading } = useCreateEvent();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: null,
    type: 'general',
    description: '',
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('location', formData.location);
    data.append('type', formData.type);
    data.append('date', formData.date.toISOString());
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await createEvent(data);
      console.log("Event created!");
      console.log(formData)
      setFormData({
        title: '',
        location: '',
        date: '',
        type: 'general',
        description: '',
        image: null,
      });
      setDropzoneKey(prev => prev + 1); 
      toast.success("Event successfully created! 🎉");
    } catch (err) {
      toast.error("Oops! Something went wrong.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        required
        id="title"
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <label htmlFor="location">Location</label>
      <input
        required
        id="location"
        type="text"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <label htmlFor="date">Date</label>
      <DatePicker
        required
        selected={formData.date}
        onChange={(date) => setFormData({ ...formData, date })}
        showTimeSelect
        minDate={new Date()}
        dateFormat="Pp"
      />

      <label htmlFor="type">Type</label>
      <select
        style={styles.select}
        id="type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
          <option value="general">General</option>
          <option value="course">Course</option>
          <option value="volunteering">Volunteering</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art and culture">Art & Culture</option>
          <option value="food and drink">Food & Drink</option>
          <option value="networking">Networking</option>
          <option value="online">Online</option>
          <option value="kids and family">Kids & Family</option>
      </select>

      <label>Image</label>
      <Dropzone
        key={dropzoneKey}
        onFileSelect={(file) => setFormData({ ...formData, image: file })}
      />

      <label>Description</label>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;

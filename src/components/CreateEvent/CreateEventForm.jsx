import React, { useState } from "react";
import Dropzone from "../Dropzone/Dropzone";
import styles from "./CreateEventForm.module.css";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
console.log(MAPBOX_TOKEN);

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date must be in the future"),
  type: Yup.string().required("Type is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

const CreateEventForm = () => {
  const { createEvent, loading } = useCreateEvent();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    location: "",
    date: new Date(),
    type: "general",
    description: "",
    image: null,
  };

  // const getCoordsFromAddress = async (address) => {
  //   const res = await fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`
  //   );
  //   const data = await res.json();

  //   if (data.features && data.features.length > 0) {
  //     const [lng, lat] = data.features[0].center;
  //     return { lat, lng };
  //   }
  //   return null;
  // };

  const handleSubmit = async (values, { resetForm }) => {
    // const coords = await getCoordsFromAddress(values.location);
    // if (!coords) {
    //   toast.error('Invalid address! Please select a valid location.');
    //   return;
    // }

    const data = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        if (key === "date") {
          const mysqlDate = val.toISOString().slice(0, 19).replace("T", " ");
          data.append(key, mysqlDate);
        } else {
          data.append(key, val);
        }
      }
    });

    // data.append('lat', coords.lat);
    // data.append('lon', coords.lng);

    data.append("lat", 60.1699);
    data.append("lon", 24.9384);

    try {
      await createEvent(data);
      toast.success("Event successfully created! 🎉");
      resetForm();
      setDropzoneKey((k) => k + 1);
      navigate("/events");
    } catch (err) {
      toast.error("Oops! Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientCircle} />
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Create a New Event</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.staticLabel} htmlFor="title">
                  Title ✱
                </label>
                <Field
                  name="title"
                  type="text"
                  className={values.title ? "filled" : ""}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles.formError}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.staticLabel} htmlFor="location">
                  Location ✱
                </label>
                {/* <AddressAutofill accessToken={MAPBOX_TOKEN}> */}
                <Field
                  name="location"
                  type="text"
                  autoComplete="address-line1"
                  style={{ width: "100%" }}
                />
                {/* </AddressAutofill> */}
                <ErrorMessage
                  name="location"
                  component="div"
                  className={styles.formError}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.staticLabel} htmlFor="date">
                  Date ✱
                </label>
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  showTimeSelect
                  minDate={new Date()}
                  dateFormat="Pp"
                  className={styles.datepicker}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className={styles.formError}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="type" className={styles.staticLabel}>
                  Type ✱
                </label>
                <Field as="select" name="type" className={styles.select}>
                  {[
                    "general",
                    "course",
                    "volunteering",
                    "sports",
                    "music",
                    "art and culture",
                    "food and drink",
                    "networking",
                    "online",
                    "kids and family",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type[0].toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className={styles.formError}
                />
              </div>

              <Dropzone
                key={dropzoneKey}
                onFileSelect={(file) => setFieldValue("image", file)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className={styles.formError}
              />

              <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.staticLabel}>
                  Description ✱
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={4}
                  className={values.description ? "filled" : ""}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.formError}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button button-gradient"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="sideImage" />
    </div>
  );
};

export default CreateEventForm;

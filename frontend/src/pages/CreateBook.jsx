import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Axios } from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesavebook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios.post("http://localhost:3000/books/addBook", data).then(() => {
      console.log("sent data ");
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        Title
      </div>
    </div>
  );
};

export default CreateBook;

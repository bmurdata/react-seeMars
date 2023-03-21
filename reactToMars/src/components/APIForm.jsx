
const APIForm = ({inputs, handleChange, onSubmit}) => {
    const inputsInfo = [
        "Discover Mars!",
      ];
    return (
      <div>
        <h2> Select Your Image Attributes: </h2>
       
        <button type="submit" className="button" onClick={onSubmit}>
                Explore Mars! 🎞
        </button>
      </div>
    );
  };
  
  export default APIForm;
  
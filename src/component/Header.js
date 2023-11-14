import { useState } from "react"
function Header({onSubmit}){
  
    const initialFormData = {
      description: '',
      date: '',
      amount: '',
      category: '',
    };
  
  const [formData, setFormData] = useState( initialFormData )
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await onSubmit(formData);

      // If the submission is successful, clear the form
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description"  placeholder="description" value={formData.description}   onChange={handleChange}/>
        <input type="date" name="date" placeholder="date" value={formData.date}   onChange={handleChange}/>
        <input type="text" name="amount" placeholder="amount" value={formData.amount}   onChange={handleChange}/>
       <input
       type="text"
        name="category"
        placeholder="category"
        value={formData.category}
        onChange={handleChange}
      />
        
        <input type="submit" value="Add Transaction"/>
      </form>
    </div>
  )
}
export default Header 
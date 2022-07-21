import React ,{useState} from "react";
import {useHistory} from "react-router-dom";





function ReservationForm({submitForm}) {



  const [formData,setFormData] = useState({first_name:"",last_name:"",mobile_number:"", reservation_date:"", reservation_time:"",people:0})


   const history = useHistory();

   function handleChange(event){
    const {name,value} = event.target;
       setFormData((prevData)=>{
         return{ ...prevData, [name]:value};
                                 
       });
     };

      function handleSubmit(event){
        event.preventDefault()
        submitForm(formData);

      }
    
  




  return (
    
  

    <form onSubmit={handleSubmit}>
        <div>
       <div class="row">
  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">First Name</label>

    <input type="text" class="form-control" placeholder="First name" aria-label="First name" name="first_name"  value={formData?.first_name} onChange={handleChange} required />
  </div>
  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">Last Name</label>

    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name"   name="last_name"  value={formData?.last_name} onChange={handleChange} required/>
  </div>

  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">Mobile Number</label>

    <input type="text" class="form-control" placeholder="Mobile Number" aria-label="Mobile Number"   name="mobile_number"  value={formData?.mobile_number} onChange={handleChange} required/>
  </div>
</div>
<div class="row">
  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">Date</label>

    <input type="date" class="form-control" placeholder="" aria-label="date"   name="reservation_date"  value={formData?.reservation_date} onChange={handleChange} required/>
  </div>
  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">Time</label>

    <input type="time" class="form-control" placeholder="" aria-label=""   name="reservation_time"  value={formData?.reservation_time} onChange={handleChange} required/>
  </div>

  <div class="col">
  <label for="formGroupExampleInput2" class="form-label">People</label>

    <input type="number" class="form-control" placeholder="Number of people" aria-label=""    name="people"  value={formData?.people} onChange={handleChange} required min ="1"/>
    
  </div>
</div>


</div>

<>
<div class="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
  <button onClick={()=> history.goBack()} class="btn btn-secondary me-md-2" type="button">Cancel</button>
  <button class="btn btn-primary" type="submit">Submit</button>
</div>



</>

    </form>
    
  )
}

export default ReservationForm
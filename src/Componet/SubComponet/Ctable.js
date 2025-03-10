import React from 'react'
import Swal from 'sweetalert2'
import { array } from 'yup'



const Randertabel = (props) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-1',
            cancelButton: 'btn btn-danger m-1'
        },
        buttonsStyling: false
    })

    
    var editdata=(id)=>{
        props.editcallback(id);
        // console.log(JSON.stringify({id:id})); 
        //  const options = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //   //  body:JSON.stringify({values})
        //   };
        //   fetch(`http://localhost:5000/get-countries?id=${id}`, options)
        //     .then(response => response.json())
        //     .then((response) => {
        //       props.editcallback(response.data);
        // })
        // .catch((err) => {
        //   alert("Server Down")
        //   console.error(err)

        // });
}  

// var editdata=(id)=>{
//     console.log(JSON.stringify({id:id})); 
//      const options = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       //  body:JSON.stringify({values})
//       };
//       fetch(`http://localhost:5000/get-state?id=${id}`, options)
//         .then(response => response.json())
//         .then((response) => {
//           props.editcallback(response.data);
//     })
//     .catch((err) => {
//       alert("Server Down")
//       console.error(err)

//     });
// }  

    var deletedata = (id) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            // let isconfirm = window.confirm("Do You Want To Delete Data ?");
            if (result) {
                props.deletedatacallback(id)
            }
            if (result.isConfirmed) {
    
            }else if(result.dismiss === Swal.DismissReason.cancel){
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                }

        })
                   
    }
    // var deletedata = (id) => {
    //     swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //     }).then((result) => {
    //         // let isconfirm = window.confirm("Do You Want To Delete Data ?");
    //         if (result.isConfirmed) {
    //             const options = {
    //                 method: 'PUT',
    //                 headers: { 'Content-Type': 'application/json' },
    //             };
    //             fetch(`http://localhost:5000/put-state?id=${id}`, options)
    //                 .then(response => response.json())
    //                 .then((response) => {

    //                     if (response.status == 1) {
    //                         swalWithBootstrapButtons.fire(
    //                             'Deleted!',
    //                             'Your file has been deleted.',
    //                             'success'
    //                         )
    //                         props.deletedatacallback();
    //                     } else {
    //                         swalWithBootstrapButtons.fire(
    //                             'Cancelled',
    //                             (response.message),
    //                             'error'
    //                         )
    //                     }



    //                 })
    //                 .catch((err) => {
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Oops...',
    //                         text: 'Something went wrong!',
    //                     })
    //                     console.error(err)

    //                 });
    //         }else if(result.dismiss === Swal.DismissReason.cancel){
    //             swalWithBootstrapButtons.fire(
    //                 'Cancelled',
    //                 'Your imaginary file is safe :)',
    //                 'error'
    //                 )
    //             }

    //     })
                   
    // }
    



    const tableheader = () => {

        return props.header.map((element) => {
            return <th scope="col">{element}</th>


        });

    }
    const tablefooter = () => {
        var i = 0;
        return props.tabledata.map((element) => {

            var keys=Object.keys(element);


            i++;

            var j=-1;
            return (
                <tr className='table-info'>
                    <th scope="row">{i}</th>
                       {
                        
                       Object.values(element).map((values)=>{

                        j++;
                        if(keys[j]!=='_id' && keys[j] !='__v'){
                            return  <td>{values}</td>

                        }
                        // console.log(element._id);    
                        
                    })}

                    <td>
                        <button type="button" class="btn btn-danger me-3"><i class="bi bi-pencil-fill" onClick={() =>editdata(element._id)}></i></button>
                        <button type="button" class="btn btn-warning me-3" onClick={() => deletedata(element._id)}><i class="bi bi-trash-fill"></i></button>
                    </td>

                </tr>
            )
 
        });

    }
    return (<>
        <table class="table">
            <thead>
                <tr>
                    {tableheader(props)}
                </tr>

            </thead>
            <tbody>

                {tablefooter(props)}
                {/* {Stablefooter(props)} */}

            </tbody>
        </table>
    </>);

}

export default Randertabel;
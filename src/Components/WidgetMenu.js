import {Offcanvas} from 'react-bootstrap'



export default function WidgetMenu({show,setShow,data,children}) {
  
    const handleClose = () => setShow(false);
  
    return (
      <>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h2>Astro-Report</h2> 
              </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {children}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
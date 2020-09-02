import React, { useState } from "react";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";

import "./AccordionIndicator.scss"

function CustomToggle({ children, eventKey, handleClick, title }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    handleClick();
  });

  return (
        <div className="card-header" type="button" onClick={decoratedOnClick} onKeyDown={decoratedOnClick}>
            {title}
            <span>{children}</span>
        </div>
  );
}

export default function AccordionIndicator(props) {
  const [activeKey, setActiveKey] = useState(0);

  const defaultActiveKey = props.defaultActiveKey ? props.defaultActiveKey : 0

  return (
    <div>
      <Accordion className={props.className} defaultActiveKey={defaultActiveKey} activeKey={activeKey}>
        {props.data.map((item, index) => (
          <Card key={index} className={item.class}>
              
            <CustomToggle
              as={Card.Header}
              eventKey={index}
              handleClick={() => {
                if (activeKey === index) {
                  setActiveKey(null);
                } else {
                  setActiveKey(index);
                }
              }}
              title={item.title}
            >
                {activeKey === index ? "-" : "+"}
            </CustomToggle>

            <Accordion.Collapse eventKey={index}>
              <Card.Body dangerouslySetInnerHTML={{__html:item.content}}></Card.Body>
            </Accordion.Collapse>

          </Card>
        ))}
      </Accordion>
    </div>
  );
};

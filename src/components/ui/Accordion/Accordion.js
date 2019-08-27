import React from "react";
import "./Accordion.css";

const Accordion = ({ data }) => {
  return (
    <div {...{ className: "accordion-list-wrapper" }}>
      <ul {...{ className: "accordion-list" }}>
        {data.map((item, key) => {
          return (
            <li {...{ className: "accordion-list__item", key }}>
              <AccordionItem {...item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

class AccordionItem extends React.Component {
  state = {
    opened: false
  };

  render() {
    const {
      props: { paragraph, title, id },
      state: { opened }
    } = this;

    return (
      <div
        id={id}
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
          onClick: () => {
            this.setState({ opened: !opened });
          }
        }}>
        <div {...{ className: "accordion-item__line" }}>
          <span {...{ className: "accordion-item__icon" }} />
          <h3 {...{ className: "accordion-item__title" }}>{title}</h3>
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content" }}>
            <div {...{ className: "accordion-item__paragraph" }}>{paragraph}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Accordion;

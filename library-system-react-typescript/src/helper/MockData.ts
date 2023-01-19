import { StylesConfig } from "react-select";
import { CSSProperties } from "react";

const options: MyOptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const customControlStyles: CSSProperties = {
  color: "white",
  borderColor: "blue",
  width: "400px",
  padding: 5,
  fontSize: 15,
  // borderBottom: '1px dotted pink',
};

type MyOptionType = {
  label: string;
  value: string;
};
// type isMulti = true;

export const selectStyle: StylesConfig<MyOptionType> = {
  control: (provided, state) => {
    const { selectProps, isMulti } = state;
    // provided has CSSObject type
    // state has ControlProps type

    // return type is CSSObject which means this line will throw
    // error if uncommented
    // return false;

    return {
      ...provided,
      ...customControlStyles,
      isMulti,
    };
  },
};

export const selectOptionsCategory = [
  { value: "math", label: "Math" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
  { value: "physic", label: "Physic" },
  { value: "biology", label: "Biology" },
  { value: "history", label: "History" },
  { value: "p.e", label: "P.E" },
  { value: "algebra", label: "Algebra" },
  { value: "i.t", label: "I.T" },
];

export const customStylesSelect = {
  menu: (provided: any, state: any) => ({
    ...provided,
    width: "350px",
    borderBottom: "1px dotted pink",
    color: "blue",
    padding: 5,
    fontSize: 15,
  }),

  // control: ((styles), { selectProps: { width }}) => ({
  //   width: width
  // }),
  // control: (styles: any, width: number) => ({...styles, width: '350px'}),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export const customStyles2 = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

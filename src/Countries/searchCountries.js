import { Component } from "react";
import style from "./searchCountries.Module.css";

export default class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filterCountry: [],
    };
  }
  componentDidMount() {
    let baseUrl = "https://restcountries.eu/rest/";
    fetch(`${baseUrl}v2/all`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data,
        });
      });
  }
  searchCountries = (el) => {
    let temp = el.target.value;
    temp = temp ? temp[0].toUpperCase()+temp.slice(1):temp
    const countriesName = this.state.countries.map((country, index) => {
      return country.name;
    });
    const filterCountries = countriesName.filter((item) => {
      return item.startsWith(temp);
    });
    this.setState({
      filterCountry: filterCountries,
    });
  };

  render() {
    return (
      <div className={style.form}>
        <h1>Search countries</h1>;
        <input type="text" onChange={(e) => this.searchCountries(e)}></input>
        {this.state.filterCountry.length ? (
          <div className={style.countries}>
            {this.state.filterCountry.map((res) => {
              return <p>{res}</p>;
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
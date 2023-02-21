import styles from "./Main.module.css";
import data from "../data/providers.json";

export function Providers() {
  return (
    <div className={styles.header}>
      <h1>Sjekk ut de beste abbonomentene akkurat nå!</h1>
      {data.map((provider) => (
        <div key={provider.name}>
          <h3>{provider.name}</h3>
          <p>Type: {provider.pricingModel}</p>
          <p>{provider.monthlyFee} kr per måned </p>
          {provider.pricingModel === "fast" && (
            <p>
              Fastpris: {provider.fixedPrice} kr/kWh for{" "}
              {provider.fixedPricePeriod} måneder
            </p>
          )}
          {provider.pricingModel === "variabel" && (
            <p>
              Variabel pris: {provider.variablePrice} kr/kWh for{" "}
              {provider.variablePricePeriod} måneder
            </p>
          )}
          {provider.pricingModel.startsWith("spot") && (
            <p>Spotpris: {provider.spotPrice} kr/kWh</p>
          )}
        </div>
      ))}
    </div>
  );
}

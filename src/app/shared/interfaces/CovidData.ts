export interface CovidData {
  meta: {
    build_time: string;
    license: string;
    version: string;
    field_definitions: {
      name: string;
      field?: string;
      deprecated: boolean;
      prior_names: string[];
    }[];
  };
  data: {
    date: string;
    states: number;
    cases: {
      total: {
        value: number;
        calculated: {
          population_percent: number;
          change_from_prior_day: number;
          seven_day_change_percent: number;
        };
      };
    };
    testing: {
      total: {
        value: number;
        calculated: {
          population_percent: number;
          change_from_prior_day: number;
          seven_day_change_percent: number;
        };
      };
    };
    outcomes: {
      hospitalized: {
        currently: {
          value: number;
          calculated: {
            population_percent: number;
            change_from_prior_day: number;
            seven_day_change_percent: number;
            seven_day_average: number;
          };
        };
        in_icu: {
          currently: {
            value: number;
            calculated: {
              population_percent: number;
              change_from_prior_day: number;
              seven_day_change_percent: number;
              seven_day_average: number;
            };
          };
        };
        on_ventilator: {
          currently: {
            value: number;
            calculated: {
              population_percent: number;
              change_from_prior_day: number;
              seven_day_change_percent: number;
              seven_day_average: number;
            };
          };
        };
      };
      death: {
        total: {
          value: number;
          calculated: {
            population_percent: number;
            change_from_prior_day: number;
            seven_day_change_percent: number;
            seven_day_average: number;
          };
        };
      };
    };
  };
}

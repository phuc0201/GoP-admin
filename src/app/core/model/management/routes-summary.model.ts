export interface IRoutesSummary {
  routes: ISummary[];
}
export interface ISummary {
  summary: {
    distance: number,
    duration: number;
  };
}

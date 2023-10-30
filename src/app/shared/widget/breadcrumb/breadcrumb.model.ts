export class BreadCrumb {
  heading: string;
  listBreadcrumb: BreadcrubmObj[];
  constructor(initObj: {
    heading: string;
    listBreadcrumb: BreadcrubmObj[];
  }) {
    this.heading = initObj.heading;
    this.listBreadcrumb = initObj.listBreadcrumb;
  }
}

export interface BreadcrubmObj {
  title: string;
  link: string;
}

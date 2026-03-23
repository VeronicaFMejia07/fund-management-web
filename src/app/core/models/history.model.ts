export interface History {
  fundID:             string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
  date:               string;
  type:              string;
  id?:                 number;
}

export interface HistoryTable {
  fundID:             string;
  name:               string;
  min_amount:         number;
  category:           string;
  notificationMethod: string;
  date:               string;
  type:              string;
}

class config {
  port!: number;
  host!: string;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.host = process.env.HOST || 'localhost';
  }

}

export default new config();

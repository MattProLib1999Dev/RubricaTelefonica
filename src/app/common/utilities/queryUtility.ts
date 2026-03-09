export class QueryUtility {

    /**
     * Encode object
     * @param object object to encode
     */
    public static base64(object: any): string {
      return window.btoa(JSON.stringify(object));
    }
  
    public static ToQuery(obj: any): string {
      let result = {};
      const params = new URLSearchParams();
      this.FlatObject(obj, "", params)
      const queryString = params.toString();
      console.log(queryString);
      return queryString;
    }
  
    public static FlatObject(obj: any, start: string = "", params: any = {}): void {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params.append(key, item);
          });
        } else {
          switch (typeof (value)) {
            case "number":
            case "string":
              params.append(start + key, obj[key].toString().trim());
              break;
            case "object":
              {
                let d: Date;
                //d.toISOString
                if (obj[key] instanceof Date)
                  params.append(start + key, obj[key].toISOString());
                else if (obj[key] && obj[key] != null)
                  this.FlatObject(obj[key], start + key + ".", params);
                else
                  params.append(start + key, "");
              }
              break;
            default:
              break;
          }
        }
      });
    }
  
    public static FormatDate(date: Date, format: string): string {
      const _padStart = (value: number): string => value.toString().padStart(2, '0');
      return format
        .replace(/yyyy/g, _padStart(date.getFullYear()))
        .replace(/dd/g, _padStart(date.getDate()))
        .replace(/MM/g, _padStart(date.getMonth() + 1))
        .replace(/hh/g, _padStart(date.getHours()))
        .replace(/mm/g, _padStart(date.getMinutes()))
        .replace(/ss/g, _padStart(date.getSeconds()));
    }
  
  
  }
  
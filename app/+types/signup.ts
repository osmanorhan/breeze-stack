export namespace Route {
    export interface LoaderArgs {
      request: Request;
    }
  
    export interface ActionData {
      error?: string;
      success?: string;
    }
  
    export interface ComponentProps {
      actionData?: ActionData;
    }
  }
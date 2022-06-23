import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: async () => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getBoard: async (id) => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL + `/${id}`);
      return data
    } catch (e) {
      logError(e)
    }
  },
  createBoard: async (board) => {
    try {
      const { data } = await axios.post(routes.CREATE_BOARD_URL, { board });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createList: async (list) => {
    try {
      const { data } = await axios.post(routes.CREATE_LIST_URL, list);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  updateList: async (id, title) => {
    // console.log(title)
    try {
      const { data } = await axios.put(routes.CREATE_LIST_URL + `/${id}`, title);
      // console.log('request', req)
      return data;
    } catch(e) {
      logError(e);
    }
  },
  getCard: async (id) => {
    console.log(' id from api client', id)
    try {
      const { data } = await axios.get(routes.CARDS_INDEX_URL + `/${id}`);
      console.log(data)
      return data;
    } catch(e) {
      logError(e);
    }
  },
  createCard: async (card) => {
    try {
      const { data } = await axios.post(routes.CREATE_CARD_URL, card);
      return data;
    } catch (e) {
      logError(e);
    }
  }
  
};

export default apiClient;

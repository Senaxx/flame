import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { App, ApiResponse, NewApp } from '../../interfaces';

export interface GetAppsAction<T> {
  type: ActionTypes.getApps | ActionTypes.getAppsSuccess | ActionTypes.getAppsError;
  payload: T;
}

export const getApps = () => async (dispatch: Dispatch) => {
  dispatch<GetAppsAction<undefined>>({
    type: ActionTypes.getApps,
    payload: undefined
  });

  try {
    const res = await axios.get<ApiResponse<App[]>>('/api/apps');

    dispatch<GetAppsAction<App[]>>({
      type: ActionTypes.getAppsSuccess,
      payload: res.data.data
    })
  } catch (err) {
    dispatch<GetAppsAction<string>>({
      type: ActionTypes.getAppsError,
      payload: err.data.data
    })
  }
}

export interface PinAppAction {
  type: ActionTypes.pinApp;
  payload: App;
}

export const pinApp = (id: number, isPinned: boolean) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<App>>(`/api/apps/${id}`, { isPinned: !isPinned });

    dispatch<PinAppAction>({
      type: ActionTypes.pinApp,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export interface AddAppAction {
  type: ActionTypes.addAppSuccess;
  payload: App;
}

export const addApp = (formData: NewApp) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<App>>('/api/apps', formData);

    dispatch<AddAppAction>({
      type: ActionTypes.addAppSuccess,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export interface DeleteAppAction {
  type: ActionTypes.deleteApp,
  payload: number
}

export const deleteApp = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete<ApiResponse<{}>>(`/api/apps/${id}`);

    dispatch<DeleteAppAction>({
      type: ActionTypes.deleteApp,
      payload: id
    })
  } catch (err) {
    console.log(err);
  }
}

export interface UpdateAppAction {
  type: ActionTypes.updateApp;
  payload: App;
}

export const updateApp = (id: number, formData: NewApp) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<App>>(`/api/apps/${id}`, formData);

    dispatch<UpdateAppAction>({
      type: ActionTypes.updateApp,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}
import { routes } from '../../api/ApiRouteSchema'
import { TScreenListResponse } from '../../api/db/indexApi'
import useAxios from '../useAxios'

export const useListScreensAction = () => {
  const { loading, response, error } = useAxios<{ payload: TScreenListResponse }>({
    params: {
      url: `${routes.baseUrl}${routes.basePath}/${routes.screens.path}`,
      method: 'GET',
    },
  })

  return { loading, response, error }
}

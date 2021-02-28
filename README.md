# warehouse app
This app was made for the Reaktor 2021 junior developer assignment. It consists of a Node / Express server backend, and React frontend. The backend is at the root, and frontend under /src folder.

The server periodically fetches warehouse data from legacy APIs (https://bad-api-assignment.reaktor.com/), saves it in cache, and provides it to the frontend through a better API at `/api/products` .

Because the amount of data is huge, the frontend uses react-fluid-table to list the data (only rows that are visible in the window are rendered). Product category can quickly be changed from the navigation menu. If there were many more categories, a dropdown menu or such could be used instead.

When the server is first launched, it takes a while to get the data from the legacy api for the first time. Later there will be no visible delays to the frontend user, because the data is updated periodically in the background.

## live demo
The app is deployed on Heroku at [https://young-bastion-96987.herokuapp.com/](https://young-bastion-96987.herokuapp.com/)

## some remaining issues
1. Testing is lacking
2. Error handling is not very good
3. Due to the large amount of data, UI really needs features such as search, filtering, ordering...
4. When should frontend update data? Right now it does automatically every 2 minutes
5. User experience is not very smooth during the initial load
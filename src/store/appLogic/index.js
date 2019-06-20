import PropTypes from 'prop-types/prop-types';
import { kea } from 'kea';

import RssParser from 'rss-parser';

import { preventCors } from '../../utils';
const parser = new RssParser();

export default kea({
    path: () => ['scenes', 'info', 'app'],

    actions: () => ({
        changeData: (data) => data.slice(),
        changeCurrentShow: (data) => data,
        changeStatuses: (data) => data
    }),

    reducers: ({ actions }) => ({
        data: [
            [],
            PropTypes.array,
            { persist: true },
            {
                [actions.changeData]: (_, payload) => payload
            }
        ],
        currentShow: [
            '',
            PropTypes.string,
            { persist: true },
            {
                [actions.changeCurrentShow]: (_, payload) => payload
            }
        ],
        statuses: [
            {},
            PropTypes.object,
            { persist: true },
            {
                [actions.changeStatuses]: (state, payload) => ({ ...state, ...payload })
            }
        ]
    }),

    thunks: ({ actions, get }) => ({
        getData: async () => {
            fetch(preventCors('http://hobbytalks.org/rss'))
                .then((response) => response.text())
                .then((data) => {
                    (async () => {
                        const feed = await parser.parseString(data);
                        const slimFeed = feed.items.map(function(item) {
                            const { title, isoDate: date, contentSnippet: description, guid: audio } = item;
                            return { title, date, description, audio };
                        });
                        actions.changeData(slimFeed);
                        if (!get('currentShow')) {
                            actions.changeCurrentShow(slimFeed[0].audio);
                        }
                    })();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    })
});

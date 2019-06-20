import React, { Component, createRef } from 'react';

import { connect } from 'kea';
import appLogic from '../../store/appLogic';

import { StyledAudioWrapper, StyledAudio } from './units';

const connectedLogic = connect({
    actions: [appLogic, ['changeCurrentShow', 'changeStatuses']],
    props: [appLogic, ['data', 'currentShow', 'statuses']]
});

class Audio extends Component {
    audioRef = createRef();

    setCurrentTime = (currentShow, statuses, el) => {
        const currentTime = statuses[currentShow];
        if (currentTime) el.currentTime = currentTime;
        if (el.paused) clearInterval(this.interval);
    };

    setStatusUpdater = () => {
        const { actions, currentShow } = this.props;
        const audioPlayer = this.audioRef.current;
        this.interval = setInterval(() => {
            if (!audioPlayer.paused) actions.changeStatuses({ [currentShow]: audioPlayer.currentTime });
        }, 1000);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentShow !== this.props.currentShow) {
            clearInterval(this.interval);
            this.setStatusUpdater();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { currentShow, data, statuses } = this.props;
        const { audio } = data.filter((item) => item.audio === currentShow)[0];

        return (
            <StyledAudioWrapper>
                <StyledAudio
                    controls={true}
                    src={audio}
                    ref={this.audioRef}
                    onLoadedData={(e) => this.setCurrentTime(currentShow, statuses, e.target)}
                    onPlay={() => this.setStatusUpdater()}
                    onPause={() => clearInterval(this.interval)}
                />
            </StyledAudioWrapper>
        );
    }
}

export default connectedLogic(Audio);

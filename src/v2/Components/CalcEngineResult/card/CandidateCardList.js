// React
import React, { useState } from 'react'

// Material
import { Grid, makeStyles } from '@material-ui/core'

// Local
import CandidateCard from './CandidateCard'
import CandidateCardDetails from './CandidateCardDetails'
import ConfirmModal from '../../../../Components/ConfirmModal/ConfirmModal'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(11),
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(11),
        },
    },
    candidateCardDetailsModal: {
        '& .customModalHeader': {
            '& > img': {
                maxHeight: '70px',
                paddingRight: theme.spacing(2),
            },
            '& > span': {
                color: theme.palette.secondary.main,
            },
            '& > button': {
                alignSelf: 'flex-start',
            },
        },
    },
}))

const CandidateCardList = ({ cardConfig, candidateImage, selected, onSelected, initialData }) => {
    const classes = useStyles()
    const [isModalOpen, setIsModalOpen] = useState(-1)

    const CandidateImageCompo = () => <img src={candidateImage} />

    return (
        <>
            <ConfirmModal
                modalWidth='lg'
                isModalOpen={isModalOpen >= 0}
                title={isModalOpen >= 0 ? cardConfig[isModalOpen]?.candidate.model : ''}
                id='CandidateCardDetailsDialog'
                fullWidth
                dialogClassName={classes.candidateCardDetailsModal}
                headerIcon={CandidateImageCompo}
                onClose={() => setIsModalOpen(-1)}>
                <CandidateCardDetails detailsData={isModalOpen >= 0 && cardConfig[isModalOpen]?.getCardDetails()} />
            </ConfirmModal>
            <Grid className={classes.mainGrid} container spacing={2}>
                {cardConfig.map((v, i) => (
                    <Grid item key={v.key} xs={12} sm={4} lg={3}>
                        <CandidateCard
                            details={v.cardInfos}
                            src={candidateImage}
                            onClick={() =>
                                onSelected({
                                    model: v.candidate.model,
                                    range: v.candidate.range,
                                    size: v.candidate.size,
                                    performances: initialData.filter((d) => d.model === v.candidate.model),
                                })
                            }
                            selected={v.candidate.model === selected?.model}
                            id={v.candidate.model}
                            index={i}
                            openPopupCallback={setIsModalOpen}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CandidateCardList
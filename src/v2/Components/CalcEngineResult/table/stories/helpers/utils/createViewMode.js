export const createViewMode = (viewMode = 'story', hideStory = false, hideDocs = false) => {
    return {
        viewMode,
        previewTabs: {
            canvas: { hidden: hideStory },
            'storybook/docs/panel': { hidden: hideDocs },
        },
    }
}

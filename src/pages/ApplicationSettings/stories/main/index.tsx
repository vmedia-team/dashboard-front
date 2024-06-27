import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Story } from "../../../../types/Stories";
import axios from "axios";
import { Api } from "../../../../constants";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import StoryCard from "./StoryCard";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { MainBreadCrumbContext } from "../../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

interface Root {
  stories: Story[];
  search: unknown[];
  message: string;
  status: boolean;
}

async function getStories(params?: unknown): Promise<Story[]> {
  return (
    await axios.get<Root>(Api("employee/client/stories"), {
      headers: {
        from: "dashboard",
      },
    })
  ).data.stories;
}

function StoriesPage() {
  const { handleAddNewTerm, handleClearLinks } = useContext(
    MainBreadCrumbContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const [stories, setStories] = useState<undefined | Story[]>(undefined);

  async function seedStories() {
    try {
      const stories = await getStories();
      setStories(stories);
    } catch (error) {
      enqueueSnackbar("تعذر في تحميل بيانات القصص", { variant: "error" });
    }
  }

  useEffect(() => {
    handleClearLinks();
    handleAddNewTerm({
      title: "اعدادات التطبيق",
      path: "/",
      disabled: true,
    });
    handleAddNewTerm({
      title: "القصص",
      path: "/",
    });
    seedStories();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} gap={2}>
        <Typography variant="h5" flexGrow={1} fontWeight={700} gutterBottom>
          القصص
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={NavLink}
          to={"create"}
        >
          اضافة قصة جديدة
        </Button>
      </Stack>
      <Box>
        <Grid container spacing={2}>
          {stories?.map((story) => (
            <Grid key={story.id} item xs={12} md={6} lg={4} xl={3}>
              <StoryCard story={story} resetStories={seedStories} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default StoriesPage;

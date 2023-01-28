import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";


function QuestionView({question, index}) {

    return <Card m={2}>
            <CardContent>
                <Typography>
                    {index+1}. {question.name}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" color="primary">Edit</Button>
            </CardActions>
         </Card>
}


export default QuestionView;
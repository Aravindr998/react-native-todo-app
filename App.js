import { useState } from "react"
import { Button, FlatList, StyleSheet, View } from "react-native"
import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"
import { StatusBar } from "expo-status-bar"

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [show, setShow] = useState(false)

  function startAddGoalHandler() {
    setShow(true)
  }
  function endAddGoalHandler() {
    setShow(false)
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prevState) => [
      ...prevState,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
  }
  function deleteGoalHandler(id) {
    setCourseGoals((prevState) => {
      return prevState.filter((goal) => goal.id !== id)
    })
  }
  //View - used to build boxes and container for other components. It is only able to hold other components
  //Every view uses flexbox by default and arranges children in flexDirection: column
  //ScrollView renders all its children even if it is not seen on the screen
  //FlatList internally loads only the items that are visible and loads new items as the user keeps scrolling
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={show}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            keyExtractor={(item) => {
              return item.id
            }}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              )
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
  },
})

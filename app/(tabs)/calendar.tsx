import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

const Calendar = () => {
  return (
    <SafeAreaView className="px-5 pt-16 bg-background flex-1">
      <View className="mb-8 flex-row items-center justify-between">
        <Text className="text-3xl text-primary font-calsans">Calendrier</Text>
        <Link href="#" className='mr-4'>
          <Feather name="edit-3" size={ 30 } color="#132541" />
        </Link>
      </View>

      {/* <CustomCalendar />

      <View className="mt-10">
        <TrainingDay id={ 1 } title={ 'Jour planche + combo' } duration={ 45 } />
      </View> */}
    </SafeAreaView>
  )
}

export default Calendar